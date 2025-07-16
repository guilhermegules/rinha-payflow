import { paymentProcessorHealthCheck } from "../adapters/payment-processor-health-check";
import { PAYMENT_QUEUE } from "../constants/redis-keys";
import { Payment } from "../domain/payment";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { connectRedis, pop } from "../infra/libs/redis";
import { savePayment } from "../infra/repositories/payments-repository";
import { paymentFactory } from "../ports/payment/payment-factory";
import { paymentProcessor } from "../adapters/payment-processor";

async function startWorker() {
  await connectRedis();

  while (true) {
    const paymentData = await pop(PAYMENT_QUEUE);

    if (!paymentData?.element) return;

    const paymentProcessorHealth = await paymentProcessorHealthCheck().check();

    const paymentBody: ProcessablePaymentBodyDTO = JSON.parse(
      paymentData.element
    );

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

    await paymentProcessor(baseUrl!).process(paymentBody);

    const payment: Payment = paymentFactory(
      paymentBody,
      paymentProcessorHealth
    );
    await savePayment(payment);
  }
}

startWorker();
