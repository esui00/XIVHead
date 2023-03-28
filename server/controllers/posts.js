import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description} = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      displayName: user.displayName,
      description,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updatePost = async (req, res) => {
  try {
    const { postId, body } = req.params;
    const post = await Post.updateOne({ postId,body });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

};
/*DELETE*/
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.deleteOne({ postId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

};