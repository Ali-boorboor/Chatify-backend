import fs from "fs";
import path from "path";
import { deleteOneMediaByID } from "#s/medias.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { Socket } from "socket.io";

const deleteMedia = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on(
      "deleteMedia",
      async ({ chatID, mediaID }: { mediaID: string; chatID: string }) => {
        const mediaDatas = await deleteOneMediaByID(mediaID);

        const previousFileIndex = mediaDatas?.media?.indexOf("/public");
        const previousFile = mediaDatas?.media?.slice(previousFileIndex);

        if (fs.existsSync(path.join("src", previousFile!))) {
          fs.rmSync(path.join("src", previousFile!), { recursive: true });
        }

        fastify.io.in(chatID).emit("mediaDeleted", { mediaID });
      }
    );
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default deleteMedia;
