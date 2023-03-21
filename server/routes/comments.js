import express from "express";
import { getAllComments, createComment } from "../controllers/comments.js";
import Comments from "../models/Comments.js";

const router = express.Router();

// Read all comments
router.get("/", getAllComments);

// Create a new comment
router.post("/create", async (req, res) => {
  const { displayName, description, pageId } = req.body;

  try {
    const newComment = new Comments({
      displayName,
      description,
      pageId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export default router;