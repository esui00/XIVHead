import express from "express";
import { getFeedEncounterPage, deleteEncounterPage } from "../controllers/encountersPage.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


/* READ */
router.get("/", verifyToken, getFeedEncounterPage);

/* DELETE */
router.delete("/delete/:id", deleteEncounterPage);


export default router;