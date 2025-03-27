import type mongoose from "mongoose";
import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";

export type UserDataType = {
  identifier: string;
  username: string;
  email: string;
  cover?: string;
  background?: string;
  password: string;
  description?: string;
};

export type signupReqDataType = {
  username: string;
  email: string;
  password: string;
};

export type loginReqDataType = {
  identifier: string;
  password: string;
};

export type IDType = string | mongoose.Types.ObjectId;

export type UserNewDataType = {
  username?: string;
  email?: string;
  password?: string;
  description?: string;
  cover?: string;
};

export type responseType = {
  res: FastifyReply;
  statusCode?: number;
  message?: string;
  data?: object | unknown[];
};

export type uploaderType = {
  destination: string;
  fileSize?: number;
  allowedTypes?: RegExp;
};

export type checkRepeatedDataType = {
  checkableData: object | null;
  res: FastifyReply;
  errorMsg: string;
  filename?: string;
};

export type checkNoContentDataType = {
  checkableData: unknown[] | object;
  res: FastifyReply;
};

export type checkUserExistanceType = {
  checkableData: object | null;
  res: FastifyReply;
  errorMsg?: string;
};

export type checkUserPasswordType = {
  password: string;
  hashedPassword: string;
  req: FastifyRequest;
  res: FastifyReply;
};

export type chatDataType = {
  title: string;
  description?: string;
  pvAccessUsers?: string[];
  cover?: string;
  messages?: string[];
  medias?: string[];
  identifier: string;
  isPV?: boolean;
};

export type chatReqDataType = {
  title: string;
  description?: string;
  pvAccessUsers: any;
  messages?: string[];
};

export type pvChatReqDataType = {
  sender: string;
  receiver: string;
};

export type chatEditDataType = {
  title?: string;
  description?: string;
  pvAccessUsers?: string[];
  messages?: string[];
  medias?: string[];
};

export type folderDataType = {
  title: string;
  href: string;
  chats?: string[];
  user: string;
};

export type folderReqDataType = {
  title: string;
  chats?: string[];
};

export type messageDataType = {
  message: string;
  sender: string;
};

export type mediaDataType = {
  media: string;
  sender: string;
};

export type messageDatasSocketType = {
  message: string;
  chatID: string;
  senderID: string;
};

export type checkParamType = {
  param: string;
  res: FastifyReply;
};

export type mediaDatasSocketType = {
  file: string;
  chatID: string;
  senderID: string;
  fileName: string;
};

export type userInfoType = {
  _id: string;
  username: string;
};

export type changePasswordReqBody = {
  currentPassword: string;
  newPassword: string;
};

export type changeUsernameReqBody = {
  newUsername: string;
  password: string;
};
