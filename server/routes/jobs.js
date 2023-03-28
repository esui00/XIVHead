import express from "express";
import { getFeedJobs, deleteJob } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedJobs);

/* DELETE */
router.delete("/delete/:id", deleteJob);


export default router;