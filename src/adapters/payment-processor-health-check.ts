import { PaymentProcessorHealthCheck } from "../ports/payment/payment-processor-health-check";

export function paymentProcessorHealthCheck(
  baseUrl: string
): PaymentProcessorHealthCheck {
  return {
    async check() {
      // add timelimit in cache for prevent to many requests
      return fetch(`${baseUrl}/payments/service-health`).then((res) =>
        res.json()
      );
    },
  };
}
