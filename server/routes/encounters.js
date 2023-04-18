import express from "express";
import { getFeedEncounters, deleteEncounter } from "../controllers/encounters.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


/* READ */
router.get("/", verifyToken, getFeedEncounters);

/* DELETE */
router.delete("/delete/:id", deleteEncounter);


export default router;