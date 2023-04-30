import express from "express";
import {    getUser ,deleteUser  } from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";
import newUser from '../models/User.js';
import bcrypt from "bcryptjs";

const router = express.Router();

//Read
router.get("/:id", verifyToken,getUser);

//Delete
router.delete("/delete/:id", deleteUser);
//Create
router.post("/register", async (req, res) => { 
    const { displayName, email, password} = req.body

    //check if email already exists
    const user = await newUser.findOne({ displayName: displayName })
    if (user)
        return res.status(409).send({ message: "Display name is taken, pick another" })

    //generates the hash
    const generateHash = await bcrypt.genSalt(Number(10))

    //parse the generated hash into the password
    const hashPassword = await bcrypt.hash(password, generateHash)

    //creates a new user
    const createNewUser = newUser({
      displayName: displayName,
      email: email,
      password: hashPassword,
    });
    
    try {
        const saveNewUser = await createNewUser.save();
        res.send(saveNewUser);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }

  })

export default router;