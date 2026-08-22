import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minlength: 2,
      maxlength: 10000,
      required: true,
      trim: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    collection: "App_Messages",
    timestamps: true,
  }
);


messageSchema.index({ receiverId: 1, createdAt: -1 });

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);