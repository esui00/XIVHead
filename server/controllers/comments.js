import Comments from "../models/Comments.js";
import User from "../models/User.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      description
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
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
