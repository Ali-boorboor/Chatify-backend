import UserModel from "#m/User";
import type { UserDataType, IDType, UserNewDataType } from "#t/types";
import type { UpdateQuery } from "mongoose";

export const createUser = async (userData: UserDataType) => {
  const createdUser = await UserModel.create(userData);

  const newUser = createdUser.toObject();

  Reflect.deleteProperty(newUser, "password");
  Reflect.deleteProperty(newUser, "cover");
  Reflect.deleteProperty(newUser, "email");
  Reflect.deleteProperty(newUser, "background");
  Reflect.deleteProperty(newUser, "__v");

  return newUser;
};

export const getAllUsers = async () => {
  const users = await UserModel.find({}).select("-password -__v").lean();

  return users;
};

export const getOneUser = async (filter: object) => {
  const user = await UserModel.findOne(filter).select("-__v").lean();

  return user;
};

export const getOneUserByID = async (userID: IDType) => {
  const user = await UserModel.findById(userID).select("-__v").lean();

  return user;
};

export const editOneUserByID = async (
  UserID: IDType,
  newData: UpdateQuery<UserNewDataType>
) => {
  const editedUser = await UserModel.findByIdAndUpdate(UserID, newData)
    .select("-password -email -__v")
    .lean();

  const user = await UserModel.findById(editedUser?._id)
    .select("-password -email -__v")
    .lean();

  return user;
};

export const deleteOneUser = async (userID: IDType) => {
  const deletedUser = await UserModel.findByIdAndDelete(userID)
    .select("-password -email -cover -background -__v")
    .lean();

  return deletedUser;
};
