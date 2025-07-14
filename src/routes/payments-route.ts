import { FastifyInstance } from "fastify";

export default async function paymentsRoute(fastify: FastifyInstance) {
  fastify.post("/payments", async (request, response) => {
    response.send({ ok: true });
  });
  fastify.get("/payments-summary", async (request, response) => {
    response.send({ ok: true });
  });
}
