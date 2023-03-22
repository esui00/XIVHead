import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema(
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

const Comments = mongoose.model("Comment", CommentsSchema);

export default Comments;