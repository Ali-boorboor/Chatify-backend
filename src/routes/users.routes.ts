import uploader from "#mid/uploader";
import authGuard from "#mid/auth.guard";
import * as controller from "#c/users.controller";
import type { FastifyInstance } from "fastify";

const destination = process.env.USERS_COVER_URL!;
const backgroundDestination = process.env.BACKGROUNDS_COVER_URL!;

const multerUploader = uploader({ destination });
const backgroundMulterUploader = uploader({
  destination: backgroundDestination,
});

const usersRouter = (fastify: FastifyInstance) => {
  fastify.put(
    "/change-password",
    { preHandler: authGuard },
    controller.changePassword
  );

  fastify.put(
    "/change-username",
    { preHandler: authGuard },
    controller.changeUsername
  );

  fastify.put(
    "/change-cover",
    { preHandler: [authGuard, multerUploader.single("cover")] },
    controller.changeCover
  );

  fastify.put(
    "/change-background",
    { preHandler: [authGuard, backgroundMulterUploader.single("background")] },
    controller.changeBackground
  );

  fastify.get("/", { preHandler: authGuard }, controller.getAll);
};

export default usersRouter;
