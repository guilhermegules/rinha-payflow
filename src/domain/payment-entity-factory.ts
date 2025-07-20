import { PaymentProcessorType } from "../types/payment-processor-type";

export function paymentEntityFactory({
  processor,
  totalamount,
  totalrequests,
}: {
  processor: PaymentProcessorType;
  totalrequests: number;
  totalamount: number;
}) {
  return {
    processor,
    totalRequests: Number(totalrequests),
    totalAmount: Number(totalamount),
  };
}
