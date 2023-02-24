import express from "express";
import {getAllComments, likeComment} from "../controllers/comments.js";
import {verifyToken} from "../middleware/auth.js";
import { createComment } from "../controllers/comments.js";

const router = express.Router();

//Read
router.get("/", verifyToken,getAllComments);

//Update likes
router.patch("/:id/like", verifyToken,likeComment);

//Create
router.get("/create", createComment);


export default router;