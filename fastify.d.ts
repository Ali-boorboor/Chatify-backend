import "fastify";

// ^ to use socket.io in fastify.io constance (type checking)

declare module "fastify" {
  interface FastifyInstance {
    io: SocketIO.Server;
  }
}
