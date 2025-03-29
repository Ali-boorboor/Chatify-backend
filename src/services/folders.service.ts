import FolderModel from "#m/Folder";
import type { folderDataType, IDType } from "#t/types";

export const createFolder = async (folderData: folderDataType) => {
  const createdFolder = await FolderModel.create(folderData);

  const newFolder = createdFolder.toObject();

  Reflect.deleteProperty(newFolder, "chats");
  Reflect.deleteProperty(newFolder, "user");
  Reflect.deleteProperty(newFolder, "__v");

  return newFolder;
};

export const getAllFolders = async (userID: string) => {
  const folders = await FolderModel.find({ user: userID })
    .select("-__v -user")
    .populate({
      path: "chats",
      select: "-__v -messages",
    })
    .lean();

  return folders;
};

export const getOneFolderByID = async (folderID: IDType) => {
  const folder = await FolderModel.findById(folderID)
    .select("-__v -user")
    .populate({
      path: "chats",
      select: "-__v -pvAccessUsers",
      populate: {
        path: "messages",
        select: "-__v -sender",
      },
    })
    .lean();

  return folder;
};

export const getOneFolderByTitle = async (title: string) => {
  const href = `/${title.toLowerCase()}`;

  const user = await FolderModel.findOne({ $or: [{ title }, { href }] })
    .select("-__v -user")
    .populate("chats", "-__v -pvAccessUsers -messages")
    .lean();

  return user;
};

export const deleteOneFolderByID = async (folderID: IDType) => {
  const folder = await FolderModel.findByIdAndDelete(folderID)
    .select("-__v -user -chats")
    .lean();

  return folder;
};
