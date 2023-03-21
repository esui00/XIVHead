import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
    {
      comment: {
        type: String,
        required: true,
      },
      displayname: {
        type: String,
        required: true,
      },
      pageid: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

CommentsSchema.virtual("displayName").get(function() {
  return this.user.displayName;
});

const Comments = mongoose.model("Comment", CommentsSchema);

export default Comments;