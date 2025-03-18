import ChatModel from "#m/Chat";
import type { IDType, chatDataType, chatEditDataType } from "#t/types";
import type { UpdateQuery } from "mongoose";

export const createChat = async (chatData: chatDataType) => {
  const createdChat = await ChatModel.create(chatData);

  const newChat = createdChat.toObject();

  Reflect.deleteProperty(newChat, "messages");
  Reflect.deleteProperty(newChat, "users");
  Reflect.deleteProperty(newChat, "cover");
  Reflect.deleteProperty(newChat, "__v");

  return newChat;
};

export const getAllChats = async () => {
  const users = await ChatModel.find({})
    .select("-__v -messages")
    .populate("users", "username identifier")
    .lean();

  return users;
};

export const getOneChatByID = async (chatID: IDType) => {
  const chat = await ChatModel.findById(chatID)
    .select("-__v")
    .populate("messages", "-__v")
    .populate("users", "-password -createdAt -updatedAt -__v")
    .lean();

  return chat;
};

export const getOneChatByTitle = async (title: string) => {
  const user = await ChatModel.findOne({ title })
    .select("-__v")
    .populate("messages", "-__v")
    .populate("users", "-password -createdAt -updatedAt -__v")
    .lean();

  return user;
};

export const editOneChatByID = async (
  chatID: IDType,
  newData: UpdateQuery<chatEditDataType>
) => {
  const chatDatas = await ChatModel.findByIdAndUpdate(chatID, newData)
    .select("-__v")
    .populate("messages", "-__v")
    .populate("users", "-password -createdAt -updatedAt -__v")
    .lean();

  return chatDatas;
};
