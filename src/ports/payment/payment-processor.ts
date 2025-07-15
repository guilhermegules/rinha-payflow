import { Payment } from "../../domain/payment";
import { ProcessablePaymentBodyDTO } from "../../dto/processable-payment-body-dto";

export interface PaymentProcessor {
  process: (payment: ProcessablePaymentBodyDTO) => Promise<Payment>;
}
