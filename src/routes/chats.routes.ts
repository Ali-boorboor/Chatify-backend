import uploader from "#mid/uploader";
import validator from "#mid/validator";
import authGuard from "#mid/auth.guard";
import * as controller from "#c/chats.controller";
import groupChatValidators from "#v/groupChatValidators";
import type { FastifyInstance } from "fastify";

const destination = process.env.CHATS_COVER_URL!;

const multerUploader = uploader({ destination });

const chatsRouter = (fastify: FastifyInstance) => {
  fastify.post(
    "/create",
    {
      preHandler: [
        authGuard,
        multerUploader.single("cover"),
        (req, res) => validator(req, res, groupChatValidators),
      ],
    },
    controller.create
  );

  fastify.post(
    "/create/pv",
    { preHandler: authGuard },
    controller.createPvChat
  );

  fastify.get("/", { preHandler: authGuard }, controller.getAll);

  fastify.get("/:chatID", { preHandler: authGuard }, controller.getOne);
};

export default chatsRouter;
