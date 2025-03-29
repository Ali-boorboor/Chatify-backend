import authGuard from "#mid/auth.guard";
import * as controller from "#c/folders.controller";
import type { FastifyInstance } from "fastify";

const foldersRouter = (fastify: FastifyInstance) => {
  fastify.post("/create", { preHandler: authGuard }, controller.create);

  fastify.get("/", { preHandler: authGuard }, controller.getAll);

  fastify.get("/:folderID", { preHandler: authGuard }, controller.getOne);

  fastify.delete("/:folderID", { preHandler: authGuard }, controller.deleteOne);
};

export default foldersRouter;
