import schema from "#schema/verifyCodes.schema";
import mongoose from "mongoose";

const verifyCodeModel = mongoose.model("verifyCodes", schema);

export default verifyCodeModel;
