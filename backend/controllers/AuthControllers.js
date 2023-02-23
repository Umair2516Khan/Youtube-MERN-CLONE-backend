import user from "../models/User.js"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser=async(req,res)=>{
    try{
    const data=await user.findOne({email:req.body.email});
    if(data){
        res.status(500).send("user exists");
    }
    else{
     const salt=bcrypt.genSaltSync(10);
     const hashPassword=bcrypt.hashSync(req.body.password,salt);
     const newUser=new user({ ...req.body,password:hashPassword});
     await newUser.save();
     res.status(200).send("User has been created");
    }
}
    catch(err){
    res.status(404).json(err.message);
    }
}

export const logIn = async(req,res)=>{
    try{
      const data=await user.findOne({email:req.body.email});
      if(!data){
        res.status(400).send("no users exists with such email");
      }
      else{
        const passwordCorrect = await bcrypt.compare(req.body.password,data.password);
        if(passwordCorrect){
            const token=jwt.sign({id:data.id},process.env.JWT);

            const {password,...otherdata}=data._doc;

            res.cookie("accessToken",token,{
                httpOnly:true
            }).status(200).send({...otherdata})

            // res.status(500).json({...otherdata});
        }
        else{
            res.status(404).send("incorrect password");
        }
      }
    }
    catch(err){
        res.status(404).json(err);
    }
}
