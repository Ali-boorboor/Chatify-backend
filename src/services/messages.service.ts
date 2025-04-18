import MessageModel from "#m/Message";
import type { IDType, messageDataType } from "#t/types";

export const createMessage = async (MessageData: messageDataType) => {
  const createdMessage = await MessageModel.create(MessageData);

  const newMessage = await MessageModel.findById(createdMessage?._id)
    .populate("sender", "-password -__v -createdAt -updatedAt")
    .select("-__v")
    .lean();

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

export const deleteOneMessageByID = async (MessageID: IDType) => {
  const message = await MessageModel.findByIdAndDelete(MessageID)
    .select("-__v -sender")
    .lean();

  return message;
};
