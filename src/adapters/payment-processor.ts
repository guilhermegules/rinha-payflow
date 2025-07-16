import { PaymentProcessor } from "../ports/payment/payment-processor";

export function paymentProcessor(baseUrl: string): PaymentProcessor {
  return {
    async process(payment) {
      try {
        const response = await fetch(`${baseUrl}/payments`, {
          method: "POST",
          body: JSON.stringify(payment),
        });
        const parsedResponse = await response.json();
        return parsedResponse;
      } catch (error) {
        console.log(error);
      }
    },
  };
}
