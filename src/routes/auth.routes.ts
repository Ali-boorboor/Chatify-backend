import uploader from "#mid/uploader";
import authGuard from "#mid/auth.guard";
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

  fastify.post("/verify-code", controller.verifyCode);

  fastify.post("/login", controller.login);

  fastify.post("/logout", { preHandler: authGuard }, controller.logout);

  fastify.get("/", { preHandler: authGuard }, controller.auth);
};

export default authRouter;
