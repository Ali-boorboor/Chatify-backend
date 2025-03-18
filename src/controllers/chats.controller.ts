import path from "path";
import response from "#u/response";
import * as service from "#s/chats.service";
import checkRepeatedData from "#u/checkRepeatedData";
import removeFileHandler from "#u/removeFileHandler";
import checkNoContentData from "#u/checkNoContentData";
import type { FastifyRequest } from "fastify/types/request";
import type { FastifyReply } from "fastify/types/reply";
import type { chatReqDataType } from "#t/types";

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { title, description, users } = req.body as chatReqDataType;
    const file: any = req.file;

    const repeatedChatData = await service.getOneChatByTitle(title);

    checkRepeatedData({
      checkableData: repeatedChatData,
      errorMsg: "Chat already exists",
      filename: file?.filename,
      res,
    });

    const result = await service.createChat({
      cover: file?.filename
        ? `${process.env.BASE_FILE_URL}${process.env.CHATS_COVER_URL}${file?.filename}`
        : undefined,
      title,
      users: JSON.parse(users),
      description,
    });

    return response({
      res,
      data: result,
      statusCode: 201,
      message: "Chat created successfully",
    });
  } catch (err: any) {
    const file: any = req.file;

    removeFileHandler(
      path.join(__dirname, "../", process.env.CHATS_COVER_URL!, file?.filename),
      res
    );

    throw res.internalServerError(err?.message);
  }
};

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const chats = await service.getAllChats();

    checkNoContentData({ checkableData: chats, res });

    return response({ res, message: "Chat rooms list", data: chats });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
