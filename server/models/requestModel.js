import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
