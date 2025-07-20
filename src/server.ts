import fastify from "fastify";
import paymentsRoute from "./routes/payments-route";
import dotenv from "dotenv";
import { connectRedis } from "./infra/libs/redis";

dotenv.config();

async function bootstrap() {
  const app = fastify({ logger: true });

  app.register(paymentsRoute);

  await connectRedis();

  app.listen(
    { port: Number(process.env.PORT), host: "0.0.0.0" },
    (err, address) => {
      if (err) throw err;
      console.log(`Server is running :: ${address}`);
    }
  );
}

bootstrap();
