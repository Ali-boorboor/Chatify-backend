import path from "path";
import response from "#u/response";
import * as service from "#s/users.service";
import checkUserPassword from "#u/checkUserPassword";
import checkRepeatedData from "#u/checkRepeatedData";
import removeFileHandler from "#u/removeFileHandler";
import checkUserExistance from "#u/checkUserExistance";
import checkNoContentData from "#u/checkNoContentData";
import type { FastifyRequest } from "fastify/types/request";
import type { FastifyReply } from "fastify/types/reply";
import type {
  changePasswordReqBody,
  changeUsernameReqBody,
  userInfoType,
} from "#t/types";

export const changeCover = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { password } = req.body as { password: string };
    const { _id } = req.user as userInfoType;
    const file: any = req.file;

    const user = await service.getOneUser({ _id });

    checkUserExistance({
      checkableData: user,
      res,
    });

    checkUserPassword({
      password,
      hashedPassword: user?.password!,
      req,
      res,
    });

    if (user?.cover) {
      const previousFileIndex = user?.cover?.indexOf("/public");
      const previousFile = user?.cover?.slice(previousFileIndex);

      removeFileHandler(path.join("src", previousFile!), res);
    }

    const result = await service.editOneUserByID(user?._id!, {
      cover: `${process.env.BASE_FILE_URL}${process.env.USERS_COVER_URL}${file?.filename}`,
    });

    return response({
      res,
      data: result!,
      message: "Cover Changed Successfully",
    });
  } catch (err: any) {
    const file: any = req.file;

    removeFileHandler(
      path.join(__dirname, "../", process.env.USERS_COVER_URL!, file?.filename),
      res
    );

    throw res.internalServerError(err?.message);
  }
};

export const changeUsername = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const { newUsername, password } = req.body as changeUsernameReqBody;
    const { _id } = req.user as userInfoType;

    const user = await service.getOneUser({ _id });
    const repeatedUserData = await service.getOneUser({
      username: newUsername,
    });

    checkUserExistance({
      checkableData: user,
      res,
    });

    checkUserPassword({
      password,
      hashedPassword: user?.password!,
      req,
      res,
    });

    checkRepeatedData({
      checkableData: repeatedUserData,
      errorMsg: "Username already exists",
      res,
    });

    const result = await service.editOneUserByID(user?._id!, {
      username: newUsername,
    });

    return response({
      res,
      data: result!,
      message: "Username Changed Successfully",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const changePassword = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const { currentPassword, newPassword } = req.body as changePasswordReqBody;
    const { _id } = req.user as userInfoType;

    const user = await service.getOneUser({ _id });

    checkUserExistance({
      checkableData: user,
      res,
    });

    checkUserPassword({
      password: currentPassword,
      hashedPassword: user?.password!,
      req,
      res,
    });

    const result = await service.editOneUserByID(user?._id!, {
      password: newPassword,
    });

    return response({
      res,
      data: result!,
      message: "Password Changed Successfully",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const changeBackground = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const { password } = req.body as { password: string };
    const { _id } = req.user as userInfoType;
    const file: any = req.file;

    const user = await service.getOneUser({ _id });

    checkUserExistance({
      checkableData: user,
      res,
    });

    checkUserPassword({
      password,
      hashedPassword: user?.password!,
      req,
      res,
    });

    if (user?.background) {
      const previousFileIndex = user?.background?.indexOf("/public");
      const previousFile = user?.background?.slice(previousFileIndex);

      removeFileHandler(path.join("src", previousFile!), res);
    }

    const result = await service.editOneUserByID(user?._id!, {
      background: `${process.env.BASE_FILE_URL}${process.env.BACKGROUNDS_COVER_URL}${file?.filename}`,
    });

    return response({
      res,
      data: result!,
      message: "Background Changed Successfully",
    });
  } catch (err: any) {
    const file: any = req.file;

    removeFileHandler(
      path.join(
        __dirname,
        "../",
        process.env.BACKGROUNDS_COVER_URL!,
        file?.filename
      ),
      res
    );

    throw res.internalServerError(err?.message);
  }
};

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await service.getAllUsers();

    const noContentResponse = checkNoContentData({ checkableData: users, res });

    if (noContentResponse) return;

    return response({ res, message: "Users list", data: users });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
