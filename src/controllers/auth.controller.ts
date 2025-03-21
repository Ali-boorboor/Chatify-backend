import path from "path";
import response from "#u/response";
import nodemailer from "nodemailer";
import * as service from "#s/users.service";
import generateToken from "#u/generateToken";
import removeFileHandler from "#u/removeFileHandler";
import checkRepeatedData from "#u/checkRepeatedData";
import checkUserPassword from "#u/checkUserPassword";
import checkUserExistance from "#u/checkUserExistance";
import generateRandomCode from "#u/generateRandomCode";
import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";
import type {
  signupReqDataType,
  loginReqDataType,
  userInfoType,
} from "#t/types";

export const signup = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { username, email, password } = req.body as signupReqDataType;
    const file: any = req?.file;

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
      email,
      password,
    });

    const randomCode = generateRandomCode();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      from: process.env.EMAIL_USER,
    });

    transporter.sendMail(
      {
        to: email,
        subject: "Welcome to Chatify",
        text: `To Verify Your Account, Use This Code: ${randomCode}`,
      },
      (err) => {
        if (err) throw res.internalServerError(err.message);
      }
    );

    return response({
      res,
      data: result,
      statusCode: 201,
      message: "User created successfully (Email Sent)",
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

export const logout = async (req: FastifyRequest, res: FastifyReply) => {
  const { _id, username } = req.user as userInfoType;

  return response({
    res,
    data: {
      userDatas: {
        _id,
        username,
      },
    },
    message: "Logged out successfully",
  });
};

export const auth = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { _id, username } = req.user as userInfoType;

    return response({
      res,
      data: {
        userDatas: {
          _id,
          username,
        },
      },
      message: "Token is valid",
    });
  } catch (err: any) {
    throw res.unauthorized("Invalid token");
  }
};
