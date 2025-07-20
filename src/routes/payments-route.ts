import { FastifyInstance } from "fastify";
import { getPaymentSummary, processPayment } from "../services/payment-service";

export default async function paymentsRoute(fastify: FastifyInstance) {
  fastify.post("/payments", processPayment);
  fastify.get("/payments-summary", getPaymentSummary);
}
