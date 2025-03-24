import { getOneChatByID } from "#s/chats.service";
import { getOneUserByID } from "#s/users.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const typingMessage = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.volatile.on(
      "isTyping",
      async ({
        chatID,
        userID,
        isTyping,
      }: {
        chatID: string;
        userID: string;
        isTyping: boolean;
      }) => {
        const chatDatas = await getOneChatByID(chatID);
        const userDatas = await getOneUserByID(userID);

        if (!chatDatas || !userDatas) {
          throw fastify.httpErrors.notFound();
        }

        socket.broadcast.volatile.emit("isTyping", {
          username: userDatas?.username,
          isTyping,
        });
      }
    );
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default typingMessage;
