import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import relicRoutes from "./routes/relics.js";
import jobRoutes from "./routes/jobs.js";
import encounterRoutes from "./routes/encounters.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { createRelic } from "./controllers/relics.js";
import {createJob} from "./controllers/jobs.js";
import {createEncounter} from "./controllers/encounters.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Relic from "./models/Relic.js";
import Job from "./models/Relic.js";
import Encounter from "./models/Encounter.js";

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect("mongodb+srv://marcus:123@capstone.hkrtot5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/api/auth/register",  register);
app.post("/api/posts", verifyToken, createPost);
app.post("/api/relics", verifyToken,  createRelic);
app.post("/api/jobs", verifyToken,  createJob);
app.post("/api/encounters", verifyToken, createEncounter);

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/relics",relicRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/encounters",encounterRoutes);

export { app };
