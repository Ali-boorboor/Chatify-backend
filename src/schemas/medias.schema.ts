import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    media: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

export default schema;
