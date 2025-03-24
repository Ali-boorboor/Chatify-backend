import { getOneChatByID, editOneChatByID } from "#s/chats.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const joinChat = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on("joinChat", async ({ chatID, userID }: any) => {
      await editOneChatByID(chatID, {
        $addToSet: { users: userID },
      });

      socket.join(chatID);

      const chat = await getOneChatByID(chatID);
      
      if (chat) {
        socket.emit("chatHistory", chat?.messages);
      }
    });
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default joinChat;
