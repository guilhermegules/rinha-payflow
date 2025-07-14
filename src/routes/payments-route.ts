import { FastifyInstance } from "fastify";

export default function paymentsRoute(fastify: FastifyInstance) {
  fastify.post("/payments", (request, response) => {});
  fastify.get("/payments-summary", (request, response) => {});
}
