import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const leaveChat = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on("leaveChat", async (chatID: string) => {
      socket.leave(chatID);
    });
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default leaveChat;
