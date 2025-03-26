import MediaModel from "#m/Media";
import type { IDType, mediaDataType } from "#t/types";

export const createMedia = async (MediaData: mediaDataType) => {
  const createdMedia = await MediaModel.create(MediaData);

  const newMedia = await MediaModel.findById(createdMedia?._id)
    .populate("sender", "-password -__v -createdAt -updatedAt")
    .select("-__v")
    .lean();

  return newMedia;
};

export const getAllMedias = async () => {
  const medias = await MediaModel.find({}).select("-__v -sender").lean();

  return medias;
};

export const getOneMediaByID = async (MediaID: IDType) => {
  const media = await MediaModel.findById(MediaID)
    .select("-__v -sender")
    .lean();

  return media;
};
