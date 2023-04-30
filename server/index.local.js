import { app } from "./index.js";
import mongoose from "mongoose";

/* MONGOOSE SETUP */
const PORT = 3001|| 6001;

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
