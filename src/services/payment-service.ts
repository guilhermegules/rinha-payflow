import { FastifyReply, FastifyRequest } from "fastify";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { enqueuePayment } from "../ports/payment/enqueue-payment";

export async function processPayment(
  request: FastifyRequest,
  response: FastifyReply
) {
  const body = request.body as ProcessablePaymentBodyDTO;

  await enqueuePayment(body);

  return response
    .status(202)
    .send({ message: "Payment requested successfully." });
}

export async function getPaymentSummary(
  request: FastifyRequest,
  response: FastifyReply
) {
  return Promise.resolve({ ok: true });
}
