import { PAYMENT_QUEUE } from "../../constants/redis-keys";
import { ProcessablePaymentBodyDTO } from "../../dto/processable-payment-body-dto";
import { push } from "../../infra/libs/redis";

export async function enqueuePayment(payment: ProcessablePaymentBodyDTO) {
  await push(PAYMENT_QUEUE, payment);
}
