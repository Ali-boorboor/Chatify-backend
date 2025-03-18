import type { FastifyReply } from "fastify/types/reply";

const generateToken = async (payload: object, res: FastifyReply) => {
  const token = await res.jwtSign(payload, { expiresIn: "10d" });

  return token;
};

export default generateToken;
