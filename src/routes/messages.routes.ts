import type { FastifyInstance } from "fastify";

const messagesRouter = (fastify: FastifyInstance) => {
  fastify.get("/", (req, res) => {
    return "test";
  });
};

export default messagesRouter;
