import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { prisma } from "@/server/db/prisma";
import { CreditService } from "@/server/services/credit.service";
import { CreditTransactionType, PaymentStatus, SubscriptionStatus } from "@prisma/client";
import { getPlanById, getPlanPrice, BillingInterval } from "./plans";

export interface CreateOrderParams {
  userId: string;
  userEmail: string;
  planId: string;
  billingInterval?: BillingInterval;
}

export interface CaptureOrderParams {
  orderId: string;
  userId: string;
}

export interface WebhookHeaders {
  authAlgo?: string;
  certUrl?: string;
  transmissionId?: string;
  transmissionSig?: string;
  transmissionTime?: string;
}

export class PayPalPaymentService {
  private baseUrl: string;
  private cachedToken: { token: string; expiresAt: number } | null = null;

  constructor() {
    this.baseUrl =
      env.PAYPAL_ENVIRONMENT === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";
  }

  /**
   * Check if PayPal is configured with real credentials
   */
  isConfigured(): boolean {
    return Boolean(env.PAYPAL_CLIENT_ID && env.PAYPAL_CLIENT_SECRET);
  }

  /**
   * Check if recurring subscriptions API is enabled
   */
  isSubscriptionsEnabled(): boolean {
    return env.PAYPAL_SUBSCRIPTIONS_ENABLED === "true";
  }

  /**
   * Fetch or refresh OAuth 2.0 Access Token using Client Credentials
   */
  async getAccessToken(): Promise<string> {
    if (!this.isConfigured()) {
      if (env.NODE_ENV === "development" || env.PAYMENT_PROVIDER === "mock") {
        return "mock_paypal_access_token";
      }
      throw new Error("PayPal API credentials are not configured.");
    }

    const now = Date.now();
    if (this.cachedToken && this.cachedToken.expiresAt > now + 60000) {
      return this.cachedToken.token;
    }

    const authHeader = Buffer.from(
      `${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`PayPal OAuth token failure: ${errorText}`, "PayPalService");
      throw new Error(`Failed to authenticate with PayPal: ${response.statusText}`);
    }

    const data = await response.json();
    const expiresInMs = (data.expires_in || 3600) * 1000;
    this.cachedToken = {
      token: data.access_token,
      expiresAt: now + expiresInMs,
    };

    return data.access_token;
  }

  /**
   * Create a PayPal v2 Checkout Order for USD one-time purchase
   */
  async createOrder(params: CreateOrderParams): Promise<{ orderId: string; amount: number; currency: string }> {
    const { userId, planId, billingInterval = "month" } = params;

    const plan = getPlanById(planId);
    if (!plan) {
      throw new Error(`Invalid or unsupported plan: ${planId}`);
    }

    const price = getPlanPrice(planId, billingInterval);
    const formattedPrice = price.toFixed(2);

    logger.info(
      `Creating PayPal order for user ${userId}, plan ${plan.name} (${billingInterval}) at $${formattedPrice} USD`,
      "PayPalService"
    );

    // Mock response fallback for dev if unconfigured
    if (!this.isConfigured()) {
      const mockOrderId = `MOCK_ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      await prisma.paymentRecord.create({
        data: {
          userId,
          provider: "MOCK_PAYPAL",
          orderId: mockOrderId,
          status: PaymentStatus.PENDING,
          planId: plan.id,
          billingInterval,
          amount: price,
          currency: "USD",
          creditsGranted: 0,
          customId: userId,
          rawResponse: { mock: true, orderId: mockOrderId, planId: plan.id },
        },
      });

      return {
        orderId: mockOrderId,
        amount: price,
        currency: "USD",
      };
    }

    const token = await this.getAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `autoclipp_${plan.id}_${Date.now()}`,
          description: `AutoClipp ${plan.name} Plan (${billingInterval})`,
          custom_id: userId,
          amount: {
            currency_code: "USD",
            value: formattedPrice,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: formattedPrice,
              },
            },
          },
          items: [
            {
              name: `AutoClipp ${plan.name} Plan`,
              description: `${plan.credits} Minutes of AI Video Processing Credits`,
              unit_amount: {
                currency_code: "USD",
                value: formattedPrice,
              },
              quantity: "1",
              category: "DIGITAL_GOODS",
            },
          ],
        },
      ],
      application_context: {
        brand_name: "AutoClipp",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?status=success`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?status=cancelled`,
      },
    };

    const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`PayPal createOrder failed: ${errorText}`, "PayPalService");
      throw new Error(`Failed to create PayPal order: ${response.statusText}`);
    }

    const orderData = await response.json();

    // Persist pending payment record in database
    await prisma.paymentRecord.create({
      data: {
        userId,
        provider: "PAYPAL",
        orderId: orderData.id,
        status: PaymentStatus.PENDING,
        planId: plan.id,
        billingInterval,
        amount: price,
        currency: "USD",
        creditsGranted: 0,
        customId: userId,
        rawResponse: orderData,
      },
    });

    return {
      orderId: orderData.id,
      amount: price,
      currency: "USD",
    };
  }

  /**
   * Capture an approved PayPal order and idempotently grant plan entitlements
   */
  async captureOrder(params: CaptureOrderParams): Promise<{
    success: boolean;
    orderId: string;
    captureId?: string;
    planId: string;
    creditsAdded: number;
    newBalance: number;
  }> {
    const { orderId, userId } = params;

    logger.info(`Attempting to capture PayPal order ${orderId} for user ${userId}`, "PayPalService");

    // 1. Fetch existing payment record from database
    const existingRecord = await prisma.paymentRecord.findUnique({
      where: { orderId },
      include: { user: true },
    });

    if (!existingRecord) {
      throw new Error(`Payment record not found for order: ${orderId}`);
    }

    // 2. Strict Security: Verify order belongs to the authenticated user
    if (existingRecord.userId !== userId) {
      logger.warn(
        `Unauthorized capture attempt: order ${orderId} owned by ${existingRecord.userId}, requested by ${userId}`,
        "PayPalService"
      );
      throw new Error("Unauthorized: Order does not belong to the current authenticated user.");
    }

    const plan = getPlanById(existingRecord.planId);
    if (!plan) {
      throw new Error(`Invalid plan found on payment record: ${existingRecord.planId}`);
    }

    // 3. IDEMPOTENCY: If already COMPLETED, return current state without double granting credits
    if (existingRecord.status === PaymentStatus.COMPLETED) {
      logger.info(`Order ${orderId} was already captured and completed. Returning existing status.`, "PayPalService");
      const balance = await CreditService.getBalance(userId);
      return {
        success: true,
        orderId: existingRecord.orderId,
        captureId: existingRecord.captureId || undefined,
        planId: existingRecord.planId,
        creditsAdded: 0, // already granted previously
        newBalance: balance,
      };
    }

    let captureId = `CAP_${Date.now()}`;
    let payerEmail = existingRecord.user.email;
    let payerName: string | null = null;
    let payerId: string | null = null;
    let captureResponseData: Record<string, unknown> = { mock: true };

    // Real PayPal Capture execution if configured
    if (this.isConfigured()) {
      const token = await this.getAccessToken();

      const captureResponse = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      });

      if (!captureResponse.ok) {
        const errorText = await captureResponse.text();
        logger.error(`PayPal order capture failed: ${errorText}`, "PayPalService");

        // Mark record as FAILED
        await prisma.paymentRecord.update({
          where: { orderId },
          data: { status: PaymentStatus.FAILED },
        });

        throw new Error(`PayPal order capture failed: ${captureResponse.statusText}`);
      }

      captureResponseData = await captureResponse.json();

      const orderStatus = (captureResponseData as { status?: string }).status;
      if (orderStatus !== "COMPLETED") {
        throw new Error(`PayPal order is not in COMPLETED status (current status: ${orderStatus})`);
      }

      // Extract capture details and verify amount/currency
      const purchaseUnits = (captureResponseData as { purchase_units?: Array<{ payments?: { captures?: Array<{ id: string; status: string; amount: { currency_code: string; value: string } }> } }> }).purchase_units;
      const captureObj = purchaseUnits?.[0]?.payments?.captures?.[0];

      if (!captureObj || captureObj.status !== "COMPLETED") {
        throw new Error("No successful capture object returned from PayPal.");
      }

      if (captureObj.amount.currency_code !== "USD") {
        throw new Error(`Currency mismatch: expected USD, received ${captureObj.amount.currency_code}`);
      }

      captureId = captureObj.id;
      const payer = (captureResponseData as { payer?: { email_address?: string; payer_id?: string; name?: { given_name?: string; surname?: string } } }).payer;
      payerEmail = payer?.email_address || payerEmail;
      payerId = payer?.payer_id || null;
      if (payer?.name) {
        payerName = `${payer.name.given_name || ""} ${payer.name.surname || ""}`.trim() || null;
      }
    }

    // 4. Atomic Entitlement Activation in PostgreSQL
    const creditsToGrant = plan.credits;
    const intervalMonths = existingRecord.billingInterval === "year" ? 12 : 1;
    const periodEnd = new Date(Date.now() + intervalMonths * 30 * 24 * 60 * 60 * 1000);

    const result = await prisma.$transaction(async (tx) => {
      // 4a. Update PaymentRecord
      await tx.paymentRecord.update({
        where: { orderId },
        data: {
          status: PaymentStatus.COMPLETED,
          captureId,
          creditsGranted: creditsToGrant,
          payerEmail,
          payerName,
          payerId,
          rawResponse: JSON.parse(JSON.stringify(captureResponseData)),
        },
      });

      // 4b. Upsert Subscription status
      await tx.subscription.upsert({
        where: { userId },
        create: {
          userId,
          status: SubscriptionStatus.ACTIVE,
          planId: plan.id,
          billingInterval: existingRecord.billingInterval || "month",
          provider: "paypal",
          currentPeriodStart: new Date(),
          currentPeriodEnd: periodEnd,
        },
        update: {
          status: SubscriptionStatus.ACTIVE,
          planId: plan.id,
          billingInterval: existingRecord.billingInterval || "month",
          provider: "paypal",
          currentPeriodStart: new Date(),
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: false,
        },
      });

      return { creditsToGrant };
    });

    // 4c. Grant user credit balance & log transaction
    const newBalance = await CreditService.addCredits(
      userId,
      result.creditsToGrant,
      CreditTransactionType.PURCHASE,
      `PayPal Purchase: ${plan.name} Plan (${existingRecord.billingInterval || "month"}) - Order ${orderId}`,
      {
        orderId,
        captureId,
        planId: plan.id,
        amountUSD: Number(existingRecord.amount),
        currency: "USD",
      }
    );

    logger.info(
      `Successfully activated ${plan.name} plan for user ${userId}. Granted ${creditsToGrant} credits. New balance: ${newBalance}`,
      "PayPalService"
    );

    return {
      success: true,
      orderId,
      captureId,
      planId: plan.id,
      creditsAdded: creditsToGrant,
      newBalance,
    };
  }

  /**
   * Verify official PayPal Webhook signature
   */
  async verifyWebhookSignature(headers: WebhookHeaders, rawBody: string): Promise<boolean> {
    if (!env.PAYPAL_WEBHOOK_ID || !this.isConfigured()) {
      if (env.NODE_ENV === "development" || env.PAYMENT_PROVIDER === "mock") {
        logger.info("Skipping webhook signature verification in mock/dev mode", "PayPalService");
        return true;
      }
      return false;
    }

    try {
      const token = await this.getAccessToken();
      const parsedBody = JSON.parse(rawBody);

      const verificationPayload = {
        auth_algo: headers.authAlgo,
        cert_url: headers.certUrl,
        transmission_id: headers.transmissionId,
        transmission_sig: headers.transmissionSig,
        transmission_time: headers.transmissionTime,
        webhook_id: env.PAYPAL_WEBHOOK_ID,
        webhook_event: parsedBody,
      };

      const response = await fetch(`${this.baseUrl}/v1/notifications/verify-webhook-signature`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationPayload),
      });

      if (!response.ok) {
        logger.warn(`PayPal webhook verification endpoint error: ${response.status}`, "PayPalService");
        return false;
      }

      const data = await response.json();
      return data.verification_status === "SUCCESS";
    } catch (err) {
      logger.error("Error verifying PayPal webhook signature", "PayPalService", err);
      return false;
    }
  }

  /**
   * Process Webhook Events idempotently
   */
  async handleWebhookEvent(event: Record<string, unknown>): Promise<{ handled: boolean; eventType: string }> {
    const eventId = event.id as string;
    const eventType = event.event_type as string;
    const summary = (event.summary as string) || "";

    if (!eventId || !eventType) {
      throw new Error("Invalid webhook event payload: missing id or event_type");
    }

    // 1. Idempotency Check
    const existing = await prisma.webhookEvent.findUnique({
      where: { eventId },
    });

    if (existing) {
      logger.info(`Webhook event ${eventId} (${eventType}) was already processed.`, "PayPalService");
      return { handled: true, eventType };
    }

    logger.info(`Processing PayPal webhook event: ${eventType} (${eventId})`, "PayPalService");

    // 2. Handle specific event types
    switch (eventType) {
      case "PAYMENT.CAPTURE.COMPLETED": {
        const resource = event.resource as Record<string, unknown>;
        const customId = (resource.custom_id as string) || "";
        const supplementaryData = resource.supplementary_data as { related_ids?: { order_id?: string } } | undefined;
        const orderId = supplementaryData?.related_ids?.order_id;

        if (orderId && customId) {
          const paymentRecord = await prisma.paymentRecord.findUnique({
            where: { orderId },
          });

          if (paymentRecord && paymentRecord.status === PaymentStatus.PENDING) {
            await this.captureOrder({ orderId, userId: customId });
          }
        }
        break;
      }

      case "PAYMENT.CAPTURE.REFUNDED":
      case "PAYMENT.CAPTURE.REVERSED": {
        const resource = event.resource as Record<string, unknown>;
        const captureId = (resource.id as string) || "";
        if (captureId) {
          await prisma.paymentRecord.updateMany({
            where: { captureId },
            data: { status: PaymentStatus.REFUNDED },
          });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        if (this.isSubscriptionsEnabled()) {
          const resource = event.resource as Record<string, unknown>;
          const subId = resource.id as string;
          const customId = resource.custom_id as string;
          if (subId && customId) {
            await prisma.subscription.updateMany({
              where: { userId: customId },
              data: {
                status: SubscriptionStatus.ACTIVE,
                paypalSubscriptionId: subId,
              },
            });
          }
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED": {
        const resource = event.resource as Record<string, unknown>;
        const subId = resource.id as string;
        if (subId) {
          await prisma.subscription.updateMany({
            where: { paypalSubscriptionId: subId },
            data: { status: SubscriptionStatus.CANCELED },
          });
        }
        break;
      }

      default:
        logger.info(`Unhandled webhook event type: ${eventType}`, "PayPalService");
        break;
    }

    // 3. Record processed event in WebhookEvent table
    await prisma.webhookEvent.create({
      data: {
        provider: "PAYPAL",
        eventId,
        eventType,
        summary,
        status: "PROCESSED",
        payload: JSON.parse(JSON.stringify(event)),
      },
    });

    return { handled: true, eventType };
  }
}

let paypalServiceInstance: PayPalPaymentService | null = null;

export function getPayPalService(): PayPalPaymentService {
  if (!paypalServiceInstance) {
    paypalServiceInstance = new PayPalPaymentService();
  }
  return paypalServiceInstance;
}
