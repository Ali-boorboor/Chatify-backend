import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const leaveChat = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on("leaveChat", async (chatID: string) => {
      socket.leave(chatID);

      const socketsInRoom = await fastify.io.in(chatID).allSockets();
      fastify.io.in(chatID).emit("onlineUsers", socketsInRoom.size);
    });
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default leaveChat;
