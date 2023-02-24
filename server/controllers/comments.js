import Comments from "../models/Comments.js";
import User from "../models/User.js";

//Create
export const createComment = async(req,res)=> {
    try {
        const{userId,description} = req.body;
        const user = await User.findById(userId);
        const newComment = new Comments({
            userId,
            displayName: user.displayName,
            description,
        });
        await newComment.save();

        const comment = await Comments.find();

        res.status(201).json(comment);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};

//Read
export const getAllComments = async(req,res)=>{
    try {
        const Comment = await Comments.find();
        res.status(200).json(Comment);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

//Likes
export const likeComment = async (req,res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const comment = await Comments.findById(id);
        const isLiked = comment.likes.get(userId);

        if(isLiked){
            comment.likes.delete(userId);
        }else{
            comment.likes.set(userId,true);
        }

        const updatedComment = await Comments.findByIdAndUpdate(
            id,
            {likes: comment.likes},
            {new:true}
        );


        res.status(200).json();
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};