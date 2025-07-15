export interface Payment {
  id: string;
  correlationId: string;
  amount: number;
  processor: string;
  status: string;
  requestedAt: string;
}
