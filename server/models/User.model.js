import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
},{timestamps:true})
const UserModel = mongoose.model("UserData",userSchema);
export default UserModel;