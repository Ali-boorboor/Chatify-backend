import fastifyMultipart from "@fastify/multipart";
import fastifySensible from "@fastify/sensible";
import fastifySocket from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import fastifyHelmet from "@fastify/helmet";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import dbConnection from "#cnfg/DB";
import Fastify from "fastify";
import path from "path";
import app from "#/app";

const fastify = Fastify({ logger: true });

// * register helmet to use for secure headers
fastify.register(fastifyHelmet, {
  crossOriginResourcePolicy: false,
});

// * register json web token to use
fastify.register(fastifyJwt, {
  secret: process.env.SECRET_JWT_KEY!,
});

// * register bcrypt to use
fastify.register(fastifyBcrypt, { saltWorkFactor: 10 });

// * serve static files & folders
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "src", "public"),
  prefix: "/public/",
});

// * register multipart to upload files
fastify.register(fastifyMultipart);

// * register cors
await fastify.register(fastifyCors, {
  origin: "http://192.168.1.100:3040",
  credentials: true,
});

// ^ register socket connection
fastify.register(fastifySocket, {
  cors: {
    origin: "http://192.168.1.100:3040",
    methods: ["GET", "POST"],
  },
});

// * register app.ts file to handle routing
fastify.register(app, { prefix: "/api/v1" });

// * registered for error handling
fastify.register(fastifySensible);

// ^ start server function
(async () => {
  try {
    const port = +process.env.PORT! || 4030;

    await dbConnection(fastify);

    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

// ! export fastify to use in models
export default fastify;
