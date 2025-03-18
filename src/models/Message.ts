import schema from "#src/schemas/messages.schema";
import mongoose from "mongoose";

const MessageModel = mongoose.model("Messages", schema);

export default MessageModel;
