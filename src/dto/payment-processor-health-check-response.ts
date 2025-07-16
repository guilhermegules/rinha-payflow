import { PaymentProcessorType } from "../types/payment-processor-type";

export interface PaymentProcessorHealthCheckResponse {
  failing: boolean;
  minResponseTime: number;
}

export interface PaymentProcessorHealthResponse
  extends PaymentProcessorHealthCheckResponse {
  serviceName: PaymentProcessorType;
}
