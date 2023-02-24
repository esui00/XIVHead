import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {   
    displayName:{
        type: String,
        required: true,
        min: 3,
        max: 12,
    },
    email:{
        type: String,
        required: true,
        max: 20,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        min: 5,
    },
    },
    {timestamps:true}
);

const User = mongoose.model("User", UserSchema);
export default User;