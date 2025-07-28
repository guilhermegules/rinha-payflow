import { FastifyReply, FastifyRequest } from "fastify";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { enqueuePayment } from "../ports/payment/enqueue-payment";
import { processablePaymentBodyValidator } from "../dto/validators/processable-payment-body-validator";
import { findPaymentSummary } from "../infra/repositories/payments-repository";
import { paymentProcessorSummaryResponseMapper } from "./mappers/payment-processor-summary-response-mapper";
import { createPaymentSummaryQueryDto } from "../dto/payment-summary-query-params-dto";
import { isValidDate } from "../utils/date-functions";
import { paymentSummaryQueryValidator } from "../dto/validators/payment-summary-query-validator";

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
  const query = request.query as { from: string; to: string };

  const { from, to } = createPaymentSummaryQueryDto(query.from, query.to);

  if (paymentSummaryQueryValidator.isInvalid(from, to)) {
    return response.status(400).send({ error: 'Invalid "from" or "to" date' });
  }

  const paymentSummary = await findPaymentSummary(from, to);

  const paymentFormatted =
    paymentProcessorSummaryResponseMapper(paymentSummary);

  return response.status(200).send(paymentFormatted);
}
