import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 30,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    chats: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chats",
        default: [],
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default schema;
