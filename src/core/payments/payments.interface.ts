export interface CreditPackage {
  id: string;
  name: string;
  credits: number; // minutes or clip units
  priceCents: number;
  popular?: boolean;
}

export interface CheckoutSessionOptions {
  userId: string;
  userEmail: string;
  packageId?: string;
  priceId?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface IPaymentService {
  createCheckoutSession(options: CheckoutSessionOptions): Promise<{ checkoutUrl: string; sessionId: string }>;
  createCustomerPortalSession(stripeCustomerId: string, returnUrl: string): Promise<{ portalUrl: string }>;
  handleWebhook(rawBody: string | Buffer, signature: string): Promise<{ handled: boolean; eventType?: string }>;
}
