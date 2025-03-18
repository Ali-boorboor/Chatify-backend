import path from "path";
import crypto from "crypto";
import fastifyMulter from "fastify-multer";
import type { uploaderType } from "#t/types";

const uploader = ({
  destination,
  fileSize = 512_000_000,
  allowedTypes = /jpg|png|jpeg/,
}: uploaderType) => {
  return fastifyMulter({
    storage: fastifyMulter.diskStorage({
      destination: path.join(__dirname, "..", destination),
      filename: (req, file, cb) => {
        const hashName = crypto
          .createHash("SHA256")
          .update(file.originalname)
          .digest("hex");

        const fileName = hashName + Date.now();

        const ext = path.extname(file.originalname);

        cb(null, `${fileName}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (allowedTypes.test(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("File format is not allowed"));
      }
    },
    limits: { fileSize },
  });
};

export default uploader;
