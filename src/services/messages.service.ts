import MessageModel from "#m/Message";
import type { IDType, messageDataType } from "#t/types";

export const createMessage = async (MessageData: messageDataType) => {
  const createdMessage = await MessageModel.create(MessageData);

  const newMessage = createdMessage.toObject();

  Reflect.deleteProperty(newMessage, "sender");
  Reflect.deleteProperty(newMessage, "__v");

  return newMessage;
};

export const getAllMessages = async () => {
  const messages = await MessageModel.find({}).select("-__v -sender").lean();

  return messages;
};

export const getOneMessageByID = async (MessageID: IDType) => {
  const message = await MessageModel.findById(MessageID)
    .select("-__v -sender")
    .lean();

  return message;
};
