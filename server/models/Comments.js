import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    pageId: {
        type: String,
        enum: ['housingpage', 'relicpage', 'jobguidepage', 'encounterpage'],
        required: true
      },
  },
  { timestamps: true }
);

CommentsSchema.virtual("displayName").get(function() {
  return this.user.displayName;
});

const Comments = mongoose.model("Comment", CommentsSchema);

export default Comments;