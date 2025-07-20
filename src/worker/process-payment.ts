import { paymentProcessor } from "../adapters/payment-processor";
import { paymentProcessorHealthCheck } from "../adapters/payment-processor-health-check";
import { Payment } from "../domain/payment";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { savePayment } from "../infra/repositories/payments-repository";
import { paymentFactory } from "../ports/payment/payment-factory";
import logger from "pino";

export async function processPayment(paymentBody: ProcessablePaymentBodyDTO) {
  logger().info({}, "Payment process start");

  const paymentProcessorHealth = await paymentProcessorHealthCheck().check();

  if (paymentProcessorHealth.failing) {
    const payment: Payment = paymentFactory(
      paymentBody,
      paymentProcessorHealth
    );

    await savePayment(payment);
    return;
  }

  const baseUrl =
    paymentProcessorHealth.serviceName === "default"
      ? process.env.PAYMENT_PROCESSOR_URL_DEFAULT
      : process.env.PAYMENT_PROCESSOR_URL_FALLBACK;

  const payment: Payment = paymentFactory(paymentBody, paymentProcessorHealth);

  const paymentProcessed = await paymentProcessor(baseUrl!).process({
    ...paymentBody,
    requestedAt: payment.requestedAt,
  });

  if (!paymentProcessed) return;

  await savePayment(payment);

  logger().info(`Payment saved sucessfully`);
}
