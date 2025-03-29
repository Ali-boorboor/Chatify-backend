import { deleteOneMessageByID } from "#s/messages.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const deleteMessage = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on(
      "deleteMessage",
      async ({ messageID, chatID }: { messageID: string; chatID: string }) => {
        await deleteOneMessageByID(messageID);

        fastify.io.in(chatID).emit("messageDeleted", { messageID });
      }
    );
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default deleteMessage;
