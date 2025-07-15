import { FastifyReply, FastifyRequest } from "fastify";

export async function processPayment(
  request: FastifyRequest,
  response: FastifyReply
) {
  return Promise.resolve({ ok: true });
}

export async function getPaymentSummary(
  request: FastifyRequest,
  response: FastifyReply
) {
  return Promise.resolve({ ok: true });
}
