import authRouter from "#r/auth.routes";
import usersRouter from "#src/routes/users.routes";
import chatsRouter from "#src/routes/chats.routes";
import foldersRouter from "#src/routes/folders.routes";
import socketConnections from "#src/socketIO/socketConnections";
import type { FastifyInstance } from "fastify";

// * app.ts file to handle routing
const app = async (fastify: FastifyInstance) => {
  // * auth router
  fastify.register(authRouter, { prefix: "/auth" });
  // * users router
  fastify.register(usersRouter, { prefix: "/user" });
  // * chats router
  fastify.register(chatsRouter, { prefix: "/chat" });
  // * folders router
  fastify.register(foldersRouter, { prefix: "/folder" });
  // ^ sockets index file
  socketConnections(fastify);
};

export default app;
