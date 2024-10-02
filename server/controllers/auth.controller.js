import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import generateToken from "../helperFun/generateToken.utils.js";
export const  login =async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            const isValidPassword = await bcrypt.compare(password,user.password);
            if(isValidPassword){
                generateToken(user._id,res);
                res.status(200).json({
                    _id : user._id,
                    username : user.username,
                })
            }
            else{
                res.status(400).json({message : "Invalid Password"})
            }
        }
        else{
            res.status(400).json({message : "User not found"})
        }

    }
    catch(error){
        console.log("error in login auth controller : ",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const signup =async (req,res) =>{
    try{
        const {username,email,password} = req.body;
        console.log(req.body)
        //use bycrypt to 
        const user = await UserModel.findOne({email});
        if(user)
        {
            return res.status(400).json({error:"Email already exists"});
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);


        const newUser = new UserModel({
            username : username,
            email :email,
            password:hashPassword,
        })
        if(newUser)
        {
            //generate jwt  from utils
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(200).json({
                _id : newUser._id,
                username : newUser.username,
            })
        }
        else
        {
            res.status(200).json({error:"Invalid data"})
        }
    }
    catch(error){
        console.log("error in signup auth controller : ",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout = (req,res) =>{
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message:"Logged out successfully"})
    }
    catch(error){
        console.log("error in logout auth controller : ",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}