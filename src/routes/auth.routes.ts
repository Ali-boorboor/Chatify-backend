import uploader from "#mid/uploader";
import * as controller from "#c/auth.controller";
import type { FastifyInstance } from "fastify";

const destination = process.env.USERS_COVER_URL!;

const multerUploader = uploader({ destination });

const authRouter = (fastify: FastifyInstance) => {
  fastify.post(
    "/signup",
    { preHandler: multerUploader.single("cover") },
    controller.signup
  );

  fastify.post("/login", controller.login);
};

export default authRouter;
