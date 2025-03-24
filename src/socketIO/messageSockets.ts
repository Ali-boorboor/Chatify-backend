import joinChat from "#src/socketIO/joinChat";
import leaveChat from "#src/socketIO/leaveChat";
import sendMessage from "#src/socketIO/sendMessage";
import typingMessage from "#src/socketIO/typingMessage";
import type { FastifyInstance } from "fastify";
import type { Socket } from "socket.io";

// ^ messages sockets index file
const messageSockets = async (fastify: FastifyInstance) => {
  try {
    fastify.io.on("connection", (socket: Socket) => {
      joinChat(fastify, socket);

      typingMessage(fastify, socket);

      sendMessage(fastify, socket);

      leaveChat(fastify, socket);
    });
  } catch (err: any) {
    fastify.log.error(err?.message);

    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default messageSockets;
