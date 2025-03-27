import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 100,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default schema;
