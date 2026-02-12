import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    receivedAt: {
      type: Date,
      required: true,
    },
    parsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Email = mongoose.model("Email", emailSchema);