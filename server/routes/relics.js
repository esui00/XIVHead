import express from "express";
import { getFeedRelics, deleteRelic } from "../controllers/relics.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedRelics);

/* DELETE */
router.delete("/delete/:id", deleteRelic);


export default router;