import { Payment } from "../domain/payment";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { savePayment } from "../infra/repositories/payments-repository";
import { paymentFactory } from "../ports/payment/payment-factory";

export async function saveFailedPayment(
  paymentBody: ProcessablePaymentBodyDTO
) {
  const payment: Payment = paymentFactory(paymentBody, {
    failing: true,
    minResponseTime: 0,
    serviceName: "notfound",
  });
  await savePayment(payment);
}
