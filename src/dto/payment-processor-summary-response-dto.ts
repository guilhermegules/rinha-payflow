export interface PaymentProcessorSummaryResponseDTO {
  default: {
    totalRequests: number;
    totalAmount: number;
  };
  fallback: { totalRequests: number; totalAmount: number };
}
