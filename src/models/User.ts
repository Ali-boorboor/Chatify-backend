import schema from "#src/schemas/users.schema";
import mongoose from "mongoose";
import fastify from "#/server";

schema.pre("save", async function (next) {
  try {
    this.password = await fastify.bcrypt.hash(this?.password);

    next();
  } catch (error: any) {
    next(error);
  }
});

schema.pre("findOneAndUpdate", async function (next) {
  try {
    const updateDatas: any = this.getUpdate();

    if (updateDatas?.password) {
      updateDatas.password = await fastify.bcrypt.hash(updateDatas?.password);
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const UserModel = mongoose.model("Users", schema);

export default UserModel;
