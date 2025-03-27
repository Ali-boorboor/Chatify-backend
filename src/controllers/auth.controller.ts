import path from "path";
import response from "#u/response";
import verifyCodeModel from "#m/verifyCode";
import * as service from "#s/users.service";
import generateToken from "#u/generateToken";
import emailConfigs from "#cnfg/emailConfigs";
import removeFileHandler from "#u/removeFileHandler";
import checkRepeatedData from "#u/checkRepeatedData";
import checkUserPassword from "#u/checkUserPassword";
import checkUserExistance from "#u/checkUserExistance";
import checkNoContentData from "#u/checkNoContentData";
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

    await verifyCodeModel.create({ code: randomCode });

    emailConfigs.sendMail(
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
      cover: userData?.cover,
      background: userData?.background,
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

export const forgotPassword = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const { identifier } = req.body as { identifier: string };

    const user = await service.getOneUser({
      $or: [{ email: identifier }, { username: identifier }],
    });

    checkUserExistance({
      checkableData: user,
      res,
    });

    const randomCode = generateRandomCode();

    await service.editOneUserByID(user?._id!, {
      password: randomCode,
    });

    emailConfigs.sendMail(
      {
        to: user?.email,
        subject: "Forgot Password",
        text: `Your New Password: ${randomCode}, Please Change Your Password Once You Logged in.`,
      },
      (err) => {
        if (err) throw res.internalServerError(err.message);
      }
    );

    return response({
      res,
      message: "New Password sent to email",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};

export const verifyCode = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { code } = req.body as { code: string };

    const foundCode = await verifyCodeModel.findOne({ code }).lean();

    checkNoContentData({ checkableData: foundCode!, res });

    if (foundCode?.usedTime! >= foundCode?.maxUse!) {
      throw res.unauthorized("Invalid code");
    }

    await verifyCodeModel.findByIdAndUpdate(foundCode?._id, {
      $inc: { usedTime: 1 },
    });

    return response({
      res,
      message: "Code is valid",
    });
  } catch (err: any) {
    throw res.internalServerError(err?.message);
  }
};
