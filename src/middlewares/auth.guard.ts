import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";

const authGuard = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken?.startsWith("Bearer")) {
      throw res.unauthorized("Invalid token");
    }

    const jwtToken = bearerToken.split(" ")[1];

    const decodedPayload = res.server.jwt.verify(jwtToken);

    req.user = decodedPayload;
  } catch (err: any) {
    throw res.unauthorized("Invalid token");
  }
};

export default authGuard;
