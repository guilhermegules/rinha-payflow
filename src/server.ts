import fastify from "fastify";
import paymentsRoute from "./routes/payments-route";
import dotenv from "dotenv";

dotenv.config();

const app = fastify({ logger: true });

app.register(paymentsRoute);

app.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) throw err;
  console.log(`Server is running :: ${address}`);
});
