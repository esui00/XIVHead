import Comment from "../models/Comments";
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
    await newComment.save();

    const comment = await Comment.find();
    res.status(201).json(comment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
  

//Read
export const getAllComments = async (req, res) => {
    try {
      const comment = await Comment.find();
      res.status(200).json(comment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
