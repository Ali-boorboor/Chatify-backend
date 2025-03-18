import uploader from "#mid/uploader";
import * as controller from "#c/chats.controller";
import type { FastifyInstance } from "fastify";

const destination = process.env.CHATS_COVER_URL!;

const multerUploader = uploader({ destination });

const chatsRouter = (fastify: FastifyInstance) => {
  fastify.post(
    "/create",
    { preHandler: multerUploader.single("cover") },
    controller.create
  );

  fastify.get("/", controller.getAll);
};

export default chatsRouter;
