import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 30,
      required: true,
    },
    description: {
      type: String,
      max: 100,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    identifier: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Messages",
        default: [],
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default schema;
