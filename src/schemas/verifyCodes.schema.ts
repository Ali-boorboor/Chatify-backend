import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    maxUse: {
      type: Number,
      required: false,
      default: 3,
    },
    usedTime: {
      type: Number,
      required: false,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(),
      expires: 86400,
    },
  },
  { timestamps: true }
);

export default schema;
