import { editOneChatByID } from "#s/chats.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const leaveChat = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on("leaveChat", async (chatID: string, userID: string) => {
      await editOneChatByID(chatID, {
        $pull: { users: userID },
      });

      socket.leave(chatID);
    });
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default leaveChat;
