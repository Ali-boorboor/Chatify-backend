import response from "#u/response";
import checkParam from "#u/checkParam";
import * as service from "#s/folders.service";
import checkRepeatedData from "#u/checkRepeatedData";
import checkNoContentData from "#u/checkNoContentData";
import type { folderReqDataType, userInfoType } from "#t/types";
import type { FastifyRequest } from "fastify/types/request";
import type { FastifyReply } from "fastify/types/reply";

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { title, chats } = req.body as folderReqDataType;
    const { _id } = req.user as userInfoType;

    const repeatedFolderData = await service.getOneFolderByTitle(title);

    checkRepeatedData({
      checkableData: repeatedFolderData,
      errorMsg: "Folder already exists",
      res,
    });

    const result = await service.createFolder({
      title,
      href: `/${title.toLowerCase()}`,
      user: _id,
      chats,
    });

    return response({
      res,
      data: result,
      statusCode: 201,
      message: "Folder created successfully",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { _id } = req.user as userInfoType;

    const folders = await service.getAllFolders(_id);

    const noContentResponse = checkNoContentData({
      checkableData: folders,
      res,
    });

    if (noContentResponse) return;

    return response({ res, message: "Folders list", data: folders });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const getOne = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { folderID } = req.params as { folderID: string };

    checkParam({ param: folderID, res });

    const folder = await service.getOneFolderByID(folderID);

    const noContentResponse = checkNoContentData({
      checkableData: folder!,
      res,
    });

    if (noContentResponse) return;

    return response({ res, message: "Folder Datas", data: folder! });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const deleteOne = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { folderID } = req.params as { folderID: string };

    checkParam({ param: folderID, res });

    const result = await service.deleteOneFolderByID(folderID);

    if (!result) {
      return res.notFound("No Folder Found");
    }

    return response({
      res,
      message: "Folder Deleted Successfully",
      data: result,
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
