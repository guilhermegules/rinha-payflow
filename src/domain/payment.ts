import { PaymentProcessorType } from "../types/payment-processor-type";
import { PaymentStatus } from "../types/payment-status";

export interface Payment {
  id: string;
  correlationId: string;
  amount: number;
  processor: PaymentProcessorType;
  status: PaymentStatus;
  requestedAt: string;
}
