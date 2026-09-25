import { IPaymentService } from "./payments.interface";
import { MockPaymentService, StripePaymentService } from "./stripe.service";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

let paymentServiceInstance: IPaymentService | null = null;

export function getPaymentService(): IPaymentService {
  if (paymentServiceInstance) {
    return paymentServiceInstance;
  }

  if (env.PAYMENT_PROVIDER === "stripe" && env.STRIPE_SECRET_KEY) {
    logger.info("Initializing StripePaymentService", "PaymentFactory");
    paymentServiceInstance = new StripePaymentService();
  } else {
    logger.info("Initializing MockPaymentService for local development", "PaymentFactory");
    paymentServiceInstance = new MockPaymentService();
  }

  return paymentServiceInstance;
}

export * from "./payments.interface";
