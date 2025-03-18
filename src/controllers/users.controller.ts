import response from "#u/response";
import * as service from "#s/users.service";
import checkNoContentData from "#u/checkNoContentData";
import type { FastifyRequest } from "fastify/types/request";
import type { FastifyReply } from "fastify/types/reply";

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await service.getAllUsers();

    checkNoContentData({ checkableData: users, res });

    return response({ res, message: "Users list", data: users });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
