import { PaymentProcessorHealthResponse } from "../../dto/payment-processor-health-check-response";

export interface PaymentProcessorHealthCheck {
  check: () => Promise<PaymentProcessorHealthResponse>;
}
