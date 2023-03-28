import express from "express";
import { getFeedPosts, deletePost, updatePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);

/* DELETE */
router.delete("/delete/:id", deletePost);

/* UPDATE */
router.put("/update/:id", updatePost);


export default router;