import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const disconnect = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on("disconnect", async () => {
      const rooms = Array.from(socket.rooms).filter(
        (room) => room !== socket.id
      );

      for (const chatID of rooms) {
        socket.leave(chatID);

        const socketsInChat = await fastify.io.in(chatID).allSockets();
        fastify.io.in(chatID).emit("onlineUsers", socketsInChat.size);
      }
    });
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default disconnect;
