import authGuard from "#mid/auth.guard";
import * as controller from "#c/users.controller";
import type { FastifyInstance } from "fastify";

const usersRouter = (fastify: FastifyInstance) => {
  fastify.route({
    method: ["GET", "PUT", "DELETE"],
    url: "/:userID",
    preHandler: authGuard,
    handler: async (req, res) => {
      switch (req.method) {
        case "GET":
          return controller.getAll(req, res);
        case "PUT":
          return controller.getAll(req, res);
        case "DELETE":
          return controller.getAll(req, res);

        default:
          return res.methodNotAllowed("Request method not allowed");
      }
    },
  });

  fastify.get("/", { preHandler: authGuard }, controller.getAll);
};

export default usersRouter;
