import mongoose from "mongoose";
import type { FastifyInstance } from "fastify";

// ^ connect to db function
const dbConnection = async (fastify: FastifyInstance) => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING!, {
      authSource: "admin",
    });
    fastify.log.info("Connect to db successfully");
  } catch (err: any) {
    fastify.log.error(err?.message);
    process.exit(1);
  }
};

export default dbConnection;
