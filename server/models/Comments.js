import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        displayName:{
            type:String,
            required:true,
        },
        description:String,
        likes:{
            type: Map,
            of:Boolean,
        },
    },
    {timestamps:true}
);

const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;