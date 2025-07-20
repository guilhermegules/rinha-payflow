import { paymentProcessorHealthCheck } from "../adapters/payment-processor-health-check";
import { PAYMENT_QUEUE } from "../constants/redis-keys";
import { Payment } from "../domain/payment";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { connectRedis, pop } from "../infra/libs/redis";
import { savePayment } from "../infra/repositories/payments-repository";
import { paymentFactory } from "../ports/payment/payment-factory";
import { paymentProcessor } from "../adapters/payment-processor";
import logger from "pino";

async function startWorker() {
  await connectRedis();

  while (true) {
    const paymentData = await pop(PAYMENT_QUEUE);

    if (!paymentData?.element) {
      continue;
    }

    const paymentBody: ProcessablePaymentBodyDTO = JSON.parse(
      paymentData.element
    );

    try {
      logger().info({}, "Payment process start");

      const paymentProcessorHealth =
        await paymentProcessorHealthCheck().check();

      if (paymentProcessorHealth.failing) {
        const payment: Payment = paymentFactory(
          paymentBody,
          paymentProcessorHealth
        );

        await savePayment(payment);

        continue;
      }

      const baseUrl =
        paymentProcessorHealth.serviceName === "default"
          ? process.env.PAYMENT_PROCESSOR_URL_DEFAULT
          : process.env.PAYMENT_PROCESSOR_URL_FALLBACK;

      const payment: Payment = paymentFactory(
        paymentBody,
        paymentProcessorHealth
      );

      const paymentProcessed = await paymentProcessor(baseUrl!).process({
        ...paymentBody,
        requestedAt: payment.requestedAt,
      });

      if (!paymentProcessed) continue;

      savePayment(payment);

      logger().info(`Payment saved sucessfully`);
    } catch (error) {
      console.error(error);
      const payment: Payment = paymentFactory(paymentBody, {
        failing: true,
        minResponseTime: 0,
        serviceName: "notfound",
      });
      savePayment(payment);
    }
  }
}

startWorker();
