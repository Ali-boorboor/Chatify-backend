import path from "path";
import response from "#u/response";
import * as service from "#s/users.service";
import generateToken from "#u/generateToken";
import removeFileHandler from "#u/removeFileHandler";
import checkRepeatedData from "#u/checkRepeatedData";
import checkUserPassword from "#u/checkUserPassword";
import checkUserExistance from "#u/checkUserExistance";
import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";
import type { signupReqDataType, loginReqDataType } from "#t/types";

export const signup = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { username, email, password } = req.body as signupReqDataType;
    const file: any = req.file;

    const repeatedUserData = await service.getOneUser({
      $or: [{ username }, { email }],
    });

    checkRepeatedData({
      checkableData: repeatedUserData,
      errorMsg: "User already exists",
      filename: file?.filename,
      res,
    });

    const result = await service.createUser({
      cover: file?.filename
        ? `${process.env.BASE_FILE_URL}${process.env.USERS_COVER_URL}${file?.filename}`
        : undefined,
      identifier: `@${username.trim().toLowerCase()}`,
      username,
      password,
    });

    return response({
      res,
      data: result,
      statusCode: 201,
      message: "User created successfully",
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

export const login = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { identifier, password } = req.body as loginReqDataType;

    const userData = await service.getOneUser({
      $or: [{ username: identifier }, { email: identifier }],
    });

    checkUserExistance({ checkableData: userData, res });

    await checkUserPassword({
      password,
      hashedPassword: userData?.password!,
      req,
      res,
    });

    const token = await generateToken(
      { _id: userData?._id, username: userData?.username },
      res
    );

    const userInfo = {
      userID: userData?._id,
      username: userData?.username,
      identifier: userData?.identifier,
    };

    return response({
      res,
      data: { userInfo, token },
      message: "Logged in successfully",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
