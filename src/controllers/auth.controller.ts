import path from "path";
import response from "#u/response";
import * as service from "#s/users.service";
import generateToken from "#u/generateToken";
import removeFileHandler from "#u/removeFileHandler";
import checkRepeatedData from "#u/checkRepeatedData";
import checkUserPassword from "#u/checkUserPassword";
import checkUserExistance from "#u/checkUserExistance";
import type { FastifyRequest } from "fastify/types/request";
import type { FastifyReply } from "fastify/types/reply";
import type { UserReqDataType } from "#t/types";

export const signup = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { username, password, description } = req.body as UserReqDataType;
    const file: any = req.file;

    const repeatedUserData = await service.getOneUserByUsername(username);

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
      identifier: `@${username}`,
      description,
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
    const { username, password } = req.body as UserReqDataType;

    const userData = await service.getOneUserByUsername(username);

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

    return response({
      res,
      data: { token },
      message: "Logged in successfully",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
