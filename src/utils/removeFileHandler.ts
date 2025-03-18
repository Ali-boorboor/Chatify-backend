import fs from "fs";
import type { FastifyReply } from "fastify";

const removeFileHandler = (fileDirection: string, res: FastifyReply) => {
  try {
    if (fs.existsSync(fileDirection)) {
      fs.rmSync(fileDirection, { recursive: true });
    }
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export default removeFileHandler;
