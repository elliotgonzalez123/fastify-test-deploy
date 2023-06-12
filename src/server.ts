import Fastify, { FastifyInstance } from "fastify";
import UserRoutes from "./routes/user";

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(UserRoutes, { prefix: "/api/users" });

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// Handle the signals and do a graceful shutdown
const exitHandler = async (signal: NodeJS.Signals) => {
  console.log(`Received signal to terminate: ${signal}`);
  await fastify.close();
  process.exit(0);
};

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);
