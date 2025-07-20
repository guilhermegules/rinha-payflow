import { PaymentProcessorType } from "../../types/payment-processor-type";

export function paymentProcessorSummaryResponseMapper(
  paymentSummary: {
    processor: PaymentProcessorType;
    totalRequests: number;
    totalAmount: number;
  }[]
) {
  return paymentSummary.reduce(
    (response, payment) => {
      if (payment.processor === "default") {
        response.default = {
          totalAmount: payment.totalAmount,
          totalRequests: payment.totalRequests,
        };
      }

      if (payment.processor === "fallback") {
        response.fallback = {
          totalAmount: payment.totalAmount,
          totalRequests: payment.totalRequests,
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
