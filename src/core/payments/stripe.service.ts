import Stripe from "stripe";
import { CheckoutSessionOptions, IPaymentService } from "./payments.interface";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export class MockPaymentService implements IPaymentService {
  async createCheckoutSession(options: CheckoutSessionOptions): Promise<{ checkoutUrl: string; sessionId: string }> {
    logger.info(`[MOCK] Created checkout session for user ${options.userId}`, "MockPayment");
    return {
      checkoutUrl: `${options.successUrl}?session_id=mock_session_${Date.now()}`,
      sessionId: `mock_sess_${Date.now()}`,
    };
  }

  async createCustomerPortalSession(stripeCustomerId: string, returnUrl: string): Promise<{ portalUrl: string }> {
    logger.info(`[MOCK] Created billing portal session for customer ${stripeCustomerId}`, "MockPayment");
    return {
      portalUrl: `${returnUrl}?portal=mock_active`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleWebhook(rawBody: string | Buffer, signature: string): Promise<{ handled: boolean; eventType?: string }> {
    return { handled: true, eventType: "mock.event" };
  }
}

export class StripePaymentService implements IPaymentService {
  private stripe: Stripe;

  constructor() {
    if (!env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is required for StripePaymentService");
    }
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia" as unknown as Stripe.LatestApiVersion,
      typescript: true,
    });
  }

  async createCheckoutSession(options: CheckoutSessionOptions): Promise<{ checkoutUrl: string; sessionId: string }> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: options.userEmail,
      client_reference_id: options.userId,
      line_items: options.priceId
        ? [{ price: options.priceId, quantity: 1 }]
        : undefined,
      mode: "subscription",
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      metadata: {
        userId: options.userId,
        packageId: options.packageId || "standard",
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  }

  async createCustomerPortalSession(stripeCustomerId: string, returnUrl: string): Promise<{ portalUrl: string }> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });

    return { portalUrl: session.url };
  }

  async handleWebhook(rawBody: string | Buffer, signature: string): Promise<{ handled: boolean; eventType?: string }> {
    if (!env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    logger.info(`Received Stripe webhook event: ${event.type}`, "StripePayment");

    // Handle payment events: checkout.session.completed, invoice.payment_succeeded, etc.
    return {
      handled: true,
      eventType: event.type,
    };
  }
}
