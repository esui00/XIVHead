import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;