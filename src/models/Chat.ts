import schema from "#src/schemas/chats.schema";
import mongoose from "mongoose";

const ChatModel = mongoose.model("Chats", schema);

export default ChatModel;
