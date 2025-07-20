import { PAYMENT_QUEUE } from "../constants/redis-keys";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { connectRedis, pop } from "../infra/libs/redis";
import logger from "pino";
import { processPayment } from "./process-payment";
import { saveFailedPayment } from "./save-failed-payment";

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
      await processPayment(paymentBody);
    } catch (error) {
      logger().error(error, `Error when saving payment`);
      await saveFailedPayment(paymentBody);
    }
  }
}

startWorker();
