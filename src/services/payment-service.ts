import { FastifyReply, FastifyRequest } from "fastify";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { enqueuePayment } from "../ports/payment/enqueue-payment";
import { processablePaymentBodyValidator } from "../dto/validators/processable-payment-body-validator";
import { findPaymentSummary } from "../infra/repositories/payments-repository";
import { paymentProcessorSummaryResponseMapper } from "./mappers/payment-processor-summary-response-mapper";

export async function processPayment(
  request: FastifyRequest,
  response: FastifyReply
) {
  const body = request.body as ProcessablePaymentBodyDTO;

  if (!processablePaymentBodyValidator(body)) {
    return response.send(422).send({ message: "Invalid body" });
  }

  await enqueuePayment(body);

  return response
    .status(202)
    .send({ message: "Payment requested successfully." });
}

export async function getPaymentSummary(
  request: FastifyRequest,
  response: FastifyReply
) {
  const { from, to } = request.query as { from: string; to: string };

  const paymentSummary = await findPaymentSummary(
    new Date(from).toISOString(),
    new Date(to).toISOString()
  );

  const paymentFormatted =
    paymentProcessorSummaryResponseMapper(paymentSummary);

  return response.status(200).send(paymentFormatted);
}
