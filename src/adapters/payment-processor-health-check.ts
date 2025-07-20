import { PaymentProcessorHealthCheck } from "../ports/payment/payment-processor-health-check";
import { getPaymentProcessorHealthCheck } from "../services/get-payment-processor-health-check";

export function paymentProcessorHealthCheck(): PaymentProcessorHealthCheck {
  return {
    async check() {
      const defaultPaymentProcessorHealth =
        await getPaymentProcessorHealthCheck("default");

      console.log(defaultPaymentProcessorHealth);

      if (!defaultPaymentProcessorHealth.failing) {
        return { ...defaultPaymentProcessorHealth, serviceName: "default" };
      }

      const fallbackPaymentProcessorHealth =
        await getPaymentProcessorHealthCheck("fallback");

      console.log(fallbackPaymentProcessorHealth);

      return { ...fallbackPaymentProcessorHealth, serviceName: "fallback" };
    },
  };
}
