import * as Yup from "yup";
import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";

const validator = async (
  req: FastifyRequest,
  res: FastifyReply,
  schema: Yup.ObjectSchema<any>
) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (err: any) {
    throw res
      .code(400)
      .send({ statusCode: 400, message: "Bad Request", errors: err?.errors });
  }
};

export default validator;
