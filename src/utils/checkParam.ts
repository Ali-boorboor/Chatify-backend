import mongoose from "mongoose";
import type { checkParamType } from "#t/types";

const checkParam = ({ param, res }: checkParamType) => {
  const isMongoID = mongoose.isValidObjectId(param);

  if (!isMongoID) {
    throw res.badRequest("Invalid mongo id");
  }
};

export default checkParam;
