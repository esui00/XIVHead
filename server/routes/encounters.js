import express from "express";
import { getFeedEncounters, deleteEncounter, updateEncounter } from "../controllers/encounters.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


/* READ */
router.get("/", verifyToken, getFeedEncounters);

/* DELETE */
router.delete("/delete/:id", deleteEncounter);

/* Update */
router.put("/update/:id", updateEncounter);


export default router;