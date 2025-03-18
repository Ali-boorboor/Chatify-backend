import authGuard from "#mid/auth.guard";
import * as controller from "#c/folders.controller";
import type { FastifyInstance } from "fastify";

const foldersRouter = (fastify: FastifyInstance) => {
  fastify.post("/create", { preHandler: authGuard }, controller.create);

  fastify.get("/", controller.getAll);
};

export default foldersRouter;
