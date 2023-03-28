import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    displayName:{
      type:String,
      required:true,
    },
    description: {
      type: String
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", commentsSchema);

export default Comment;