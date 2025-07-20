import { PaymentProcessorHealthCheckResponse } from "../dto/payment-processor-health-check-response";
import { getValue, setValue } from "../infra/libs/redis";
import { PaymentProcessorType } from "../types/payment-processor-type";

export async function getPaymentProcessorHealthCheck(
  service: PaymentProcessorType
): Promise<PaymentProcessorHealthCheckResponse> {
  const cacheKey = `health-check:${service}`;

  const redisValue = await getValue(cacheKey);

  if (redisValue) {
    return JSON.parse(redisValue);
  }

  const url =
    service === "default"
      ? `${process.env.PAYMENT_PROCESSOR_URL_DEFAULT}/payments/service-health`
      : `${process.env.PAYMENT_PROCESSOR_URL_FALLBACK}/payments/service-health`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch health check from ${service}`);
    }

    const data = await response.json();

    const valueTtlSeconds = 5;

    await setValue(cacheKey, JSON.stringify(data), valueTtlSeconds);

    return data;
  } catch (error) {
    console.error(`Health check failed for ${service}.`, error);

    return { failing: true, minResponseTime: 9999 };
  }
}
