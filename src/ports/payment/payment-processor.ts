import { ProcessablePaymentWorkerBody } from "../../dto/processable-payment-body-dto";

export interface PaymentProcessor {
  process: (
    payment: ProcessablePaymentWorkerBody
  ) => Promise<string | undefined>;
}
