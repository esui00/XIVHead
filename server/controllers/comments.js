import Comments from "../models/Comments.js";
import User from "../models/User.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { userId, description} = req.body;
    const user = await User.findById(userId);
    const newComment = new Comment({
      userId,
      displayName: user.displayName,
      description
    });
    await newPost.save();

    const post = await Comment.find();
    res.status(201).json(Comment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
  

//Read
export const getAllComments = async (req, res) => {
    const { pageId } = req.query;
    try {
      const comments = await Comments.find({ pageId }).sort({ createdAt: "desc" });
      res.status(200).json(comments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
