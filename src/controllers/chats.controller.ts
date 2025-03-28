import path from "path";
import response from "#u/response";
import checkParam from "#u/checkParam";
import * as service from "#s/chats.service";
import * as usersService from "#s/users.service";
import checkRepeatedData from "#u/checkRepeatedData";
import removeFileHandler from "#u/removeFileHandler";
import checkNoContentData from "#u/checkNoContentData";
import type { FastifyRequest } from "fastify/types/request";
import type { FastifyReply } from "fastify/types/reply";
import type {
  chatReqDataType,
  pvChatReqDataType,
  userInfoType,
} from "#t/types";
import checkUserExistance from "#src/utils/checkUserExistance.ts";

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { title, description } = req.body as chatReqDataType;
    const file: any = req.file;

    const repeatedChatData = await service.getOneChat({ title });

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
      description,
      identifier: `#${title.trim().toLowerCase()}`,
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

export const createPvChat = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { sender, receiver } = req.body as pvChatReqDataType;

    const senderUserDatas = await usersService.getOneUserByID(sender);
    const receiverUserDatas = await usersService.getOneUserByID(receiver);

    checkUserExistance({ checkableData: senderUserDatas, res });
    checkUserExistance({ checkableData: receiverUserDatas, res });

    const result = await service.createChat({
      title: receiverUserDatas!.username,
      identifier: receiverUserDatas!.identifier,
      cover: receiverUserDatas!.cover || undefined,
      description: receiverUserDatas!.description || undefined,
      pvAccessUsers: [sender, receiver],
      isPV: true,
    });

    return response({
      res,
      data: result,
      statusCode: 201,
      message: "Chat created successfully",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { _id } = req.user as userInfoType;

    const chats = await service.getAllChats({
      $and: [
        {
          $or: [
            { pvAccessUsers: { $in: [_id] } },
            { pvAccessUsers: { $exists: false } },
          ],
        },
      ],
    });

    checkNoContentData({ checkableData: chats, res });

    return response({ res, message: "Chat rooms list", data: chats });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const getOne = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { chatID } = req.params as { chatID: string };

    checkParam({ param: chatID, res });

    const chat = await service.getOneChatByID(chatID);

    checkNoContentData({ checkableData: chat!, res });

    return response({ res, message: "Chat Datas", data: chat! });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
