import { PaymentProcessor } from "../ports/payment/payment-processor";

export function paymentProcessor(baseUrl: string): PaymentProcessor {
  return {
    async process(payment) {
      const response = await fetch(`${baseUrl}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    },
  };
}
