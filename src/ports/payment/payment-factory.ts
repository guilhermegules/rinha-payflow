import { Payment } from "../../domain/payment";
import { PaymentProcessorHealthResponse } from "../../dto/payment-processor-health-check-response";
import { ProcessablePaymentBodyDTO } from "../../dto/processable-payment-body-dto";

export function paymentFactory(
  payment: ProcessablePaymentBodyDTO,
  processorHealth: PaymentProcessorHealthResponse
): Payment {
  return {
    amount: payment.amount,
    correlationId: payment.correlationId,
    id: crypto.randomUUID(),
    processor: processorHealth.serviceName,
    requestedAt: new Date().toISOString(),
    status: processorHealth.failing ? "failure" : "success",
  };
}
