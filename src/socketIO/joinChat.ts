import { getOneChatByID } from "#s/chats.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const joinChat = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on("joinChat", async ({ chatID }: { chatID: string }) => {
      socket.join(chatID);

      const chat = await getOneChatByID(chatID);
      const socketsInRoom = await fastify.io.in(chatID).allSockets();

      if (chat) {
        fastify.io.in(chatID).emit("chatHistory", chat?.messages);
        fastify.io.in(chatID).emit("chatInfo", chat);
        fastify.io.in(chatID).emit("onlineUsers", socketsInRoom.size);
      }
    });
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default joinChat;
