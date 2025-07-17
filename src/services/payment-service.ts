import { FastifyReply, FastifyRequest } from "fastify";
import { ProcessablePaymentBodyDTO } from "../dto/processable-payment-body-dto";
import { enqueuePayment } from "../ports/payment/enqueue-payment";
import { db } from "../infra/libs/pg";
import { processablePaymentBodyValidator } from "../dto/validators/processable-payment-body-validator";

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
  console.log((await db.query("select * from payments")).rows);
  return Promise.resolve({ ok: true });
}
