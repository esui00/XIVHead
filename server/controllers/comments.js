import Comments from "../models/Comments.js";
import User from "../models/User.js";

// Create
export const createComment = async (req, res) => {
    console.log(req.body);
    const {  displayName, description, pageId } = req.body;

  
    try {
      const newComment = new Comments({
        displayName: User.displayName,
        description,
        pageId,
      });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.log(error);
      res.status(409).json({ message: error.message });
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
