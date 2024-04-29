import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
