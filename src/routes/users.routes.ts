import uploader from "#mid/uploader";
import validator from "#mid/validator";
import authGuard from "#mid/auth.guard";
import * as controller from "#c/users.controller";
import {
  changePasswordValidators,
  changeUsernameValidators,
  changeCoverValidators,
  changeBackgroundValidators,
} from "#v/usersValidators";
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
    {
      preHandler: [
        authGuard,
        (req, res) => validator(req, res, changePasswordValidators),
      ],
    },
    controller.changePassword
  );

  fastify.put(
    "/change-username",
    {
      preHandler: [
        authGuard,
        (req, res) => validator(req, res, changeUsernameValidators),
      ],
    },
    controller.changeUsername
  );

  fastify.put(
    "/change-cover",
    {
      preHandler: [
        authGuard,
        multerUploader.single("cover"),
        (req, res) => validator(req, res, changeCoverValidators),
      ],
    },
    controller.changeCover
  );

  fastify.put(
    "/change-background",
    {
      preHandler: [
        authGuard,
        backgroundMulterUploader.single("background"),
        (req, res) => validator(req, res, changeBackgroundValidators),
      ],
    },
    controller.changeBackground
  );

  fastify.get("/", { preHandler: authGuard }, controller.getAll);
};

export default usersRouter;
