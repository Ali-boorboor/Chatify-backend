import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createMedia } from "#s/medias.service";
import { editOneChatByID } from "#s/chats.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { mediaDatasSocketType } from "#t/types";
import type { Socket } from "socket.io";

const sendMedia = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on(
      "sendNewMedia",
      async ({ chatID, senderID, file, fileName }: mediaDatasSocketType) => {
        const hashName = crypto
          .createHash("SHA256")
          .update(fileName)
          .digest("hex");

        const filename = hashName + Date.now();

        const ext = path.extname(fileName);

        fs.writeFile(
          path.join(__dirname, "..", "/public/messages", `${filename}${ext}`),
          file,
          async (err) => {
            if (!err) {
              const newMediaDatas = await createMedia({
                media: `${process.env.BASE_FILE_URL}${process.env.MESSAGES_COVER_URL}${filename}${ext}`,
                sender: senderID,
              });

              await editOneChatByID(chatID, {
                $push: { medias: newMediaDatas?._id },
              });

              fastify.io.in(chatID).emit("newMedia", newMediaDatas);
            } else {
              fastify.log.error(err?.message);
              throw fastify.httpErrors.internalServerError(err?.message);
            }
          }
        );
      }
    );
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default sendMedia;
