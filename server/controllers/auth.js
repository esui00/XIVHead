import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*Register User*/
export const register = async(req,res) =>{
    console.log(req.body);
    try {
        const {
            displayName,
            password,
            email,
        } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        displayName,
        password: passwordHash,
        email,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error: error.message});    
    }
};

//Login
export const login = async (req,res) =>{
    try {
        const{email,password}= req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: "User does not exist."});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign({id: user._id}, "superHardString");
        delete user.password;
        res.status(200).json({token,user});

    } catch (error) {
        res.status(500).json({error: error.message});    
    }
}