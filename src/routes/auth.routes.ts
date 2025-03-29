import uploader from "#mid/uploader";
import validator from "#mid/validator";
import authGuard from "#mid/auth.guard";
import * as controller from "#c/auth.controller";
import loginValidators from "#v/loginValidators";
import signupValidations from "#v/signupValidators";
import verifyCodeValidators from "#v/verifyCodeValidators";
import forgotPassValidators from "#v/forgotPassValidators";
import type { FastifyInstance } from "fastify";

const destination = process.env.USERS_COVER_URL!;

const multerUploader = uploader({ destination });

const authRouter = (fastify: FastifyInstance) => {
  fastify.post(
    "/signup",
    {
      preHandler: [
        multerUploader.single("cover"),
        (req, res) => validator(req, res, signupValidations),
      ],
    },
    controller.signup
  );

  fastify.post(
    "/verify-code",
    { preHandler: (req, res) => validator(req, res, verifyCodeValidators) },
    controller.verifyCode
  );

  fastify.post(
    "/login",
    { preHandler: (req, res) => validator(req, res, loginValidators) },
    controller.login
  );

  fastify.post(
    "/forgot-password",
    { preHandler: (req, res) => validator(req, res, forgotPassValidators) },
    controller.forgotPassword
  );

  fastify.post("/logout", { preHandler: authGuard }, controller.logout);

  fastify.get("/", { preHandler: authGuard }, controller.auth);
};

export default authRouter;
