import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
