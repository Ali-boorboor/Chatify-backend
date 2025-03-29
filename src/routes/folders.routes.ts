import validator from "#mid/validator";
import authGuard from "#mid/auth.guard";
import * as controller from "#c/folders.controller";
import createFolderValidators from "#v/foldersValidators";
import type { FastifyInstance } from "fastify";

const foldersRouter = (fastify: FastifyInstance) => {
  fastify.post(
    "/create",
    {
      preHandler: [
        authGuard,
        (req, res) => validator(req, res, createFolderValidators),
      ],
    },
    controller.create
  );

  fastify.get("/", { preHandler: authGuard }, controller.getAll);

  fastify.get("/:folderID", { preHandler: authGuard }, controller.getOne);

  fastify.delete("/:folderID", { preHandler: authGuard }, controller.deleteOne);
};

export default foldersRouter;
