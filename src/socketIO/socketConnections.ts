import joinChat from "#src/socketIO/joinChat";
import leaveChat from "#src/socketIO/leaveChat";
import sendMedia from "#src/socketIO/sendMedia";
import disconnect from "#src/socketIO/disconnect";
import sendMessage from "#src/socketIO/sendMessage";
import typingMessage from "#src/socketIO/typingMessage";
import type { FastifyInstance } from "fastify";
import type { Socket } from "socket.io";

// ^ sockets index file
const socketConnections = async (fastify: FastifyInstance) => {
  try {
    fastify.io.on("connection", (socket: Socket) => {
      joinChat(fastify, socket);

      typingMessage(fastify, socket);

      sendMessage(fastify, socket);

      sendMedia(fastify, socket);

      leaveChat(fastify, socket);

      disconnect(fastify, socket);
    });
  } catch (err: any) {
    fastify.log.error(err?.message);

    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default socketConnections;
