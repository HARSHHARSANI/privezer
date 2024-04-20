import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    groupChat: {
      type: Boolean,
      default: false,
    },

    creator: {
      type: ObjectId,
      ref: "User",
    },

    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

chatSchema.index({ creator: 1 });

export default mongoose.model("Chat", chatSchema);
