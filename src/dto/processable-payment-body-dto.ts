export interface ProcessablePaymentBodyDTO {
  correlationId: string;
  amount: number;
}

export interface ProcessablePaymentWorkerBody
  extends ProcessablePaymentBodyDTO {
  requestedAt: string;
}
