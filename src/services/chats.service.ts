import ChatModel from "#m/Chat";
import type { IDType, chatDataType, chatEditDataType } from "#t/types";
import type { UpdateQuery } from "mongoose";

export const createChat = async (chatData: chatDataType) => {
  const createdChat = await ChatModel.create(chatData);

  const newChat = createdChat.toObject();

  Reflect.deleteProperty(newChat, "pvAccessUsers");
  Reflect.deleteProperty(newChat, "messages");
  Reflect.deleteProperty(newChat, "cover");
  Reflect.deleteProperty(newChat, "__v");

  return newChat;
};

export const getAllChats = async (filter: object) => {
  const chats = await ChatModel.find(filter)
    .sort({ _id: -1 })
    .select("-__v -messages -medias -pvAccessUsers")
    .lean();

  return chats;
};

export const getOneChat = async (filter: object) => {
  const chat = await ChatModel.findOne(filter)
    .select("-__v")
    .populate("pvAccessUsers", "-__v -password -createdAt -updatedAt -email")
    .populate("messages", "-__v")
    .populate("medias", "-__v")
    .lean();

  return chat;
};

export const getOneChatByID = async (chatID: IDType) => {
  const chat = await ChatModel.findById(chatID)
    .select("-__v")
    .populate("pvAccessUsers", "-__v -password -createdAt -updatedAt -email")
    .populate({
      path: "messages",
      select: "-__v",
      populate: {
        path: "sender",
        select: "-__v -password -createdAt -updatedAt -email",
      },
    })
    .populate({
      path: "medias",
      select: "-__v",
      populate: {
        path: "sender",
        select: "-__v -password -createdAt -updatedAt -email",
      },
    })
    .lean();

  return chat;
};

export const editOneChatByID = async (
  chatID: IDType,
  newData: UpdateQuery<chatEditDataType>
) => {
  const chatDatas = await ChatModel.findByIdAndUpdate(chatID, newData)
    .select("-__v -pvAccessUsers")
    .populate("messages", "-__v")
    .populate("medias", "-__v")
    .lean();

  return chatDatas;
};

export const deleteOneChatByID = async (chatID: IDType) => {
  const deletedChat = await ChatModel.findByIdAndDelete(chatID)
    .select("-__v -createdAt -updatedAt -messages -medias -pvAccessUsers")
    .lean();

  return deletedChat;
};
