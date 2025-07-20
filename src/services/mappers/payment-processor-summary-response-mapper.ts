import { PaymentProcessorType } from "../../types/payment-processor-type";

export function paymentProcessorSummaryResponseMapper(
  paymentSummary: {
    processor: PaymentProcessorType;
    totalRequests: number;
    totalAmount: number;
  }[]
) {
  return paymentSummary.reduce(
    (response, { processor, totalAmount, totalRequests }) => {
      if (processor === "default" || processor === "fallback") {
        response[processor] = {
          totalAmount,
          totalRequests,
        };
      }

      return response;
    },
    {
      default: {
        totalRequests: 0,
        totalAmount: 0,
      },
      fallback: { totalRequests: 0, totalAmount: 0 },
    }
  );
}
