import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";

export type UserDataType = {
  identifier: string;
  username: string;
  cover?: string;
  password: string;
  description?: string;
};

export type UserReqDataType = {
  username: string;
  password: string;
  description: string;
};

export type IDType = string;

export type UserNewDataType = {
  identifier?: string;
  username?: string;
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
  users: string[];
  cover?: string;
  messages?: string[];
};

export type chatReqDataType = {
  title: string;
  description?: string;
  users: any;
  messages?: string[];
};

export type chatEditDataType = {
  title?: string;
  description?: string;
  users?: string[];
  messages?: string[];
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

export type userInfoType = {
  _id: string;
  username: string;
};

export type messageDataType = {
  message: string;
  sender: string;
};

export type messageDatasSocketType = {
  message: string;
  chatID: string;
  senderID: string;
};
