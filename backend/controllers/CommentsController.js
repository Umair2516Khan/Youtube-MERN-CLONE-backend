import mongoose from "mongoose"
import comments from '../models/Comments.js';

export const getAllComments=async(req,res)=>{
    try{
    const all_comments=await comments.find({videoId:req.params.videoid});
    
    res.status(200).send(all_comments.flat().sort((a,b)=>{
        return b.createdAt-a.createdAt
    }));
    // res.status(200).send(all_comments_in_order);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

export const addComment=async(req,res)=>{
    try{
const comment=new comments({...req.body,videoId:req.params.videoid,userId:req.user.id});
await comment.save();
res.status(200).send("comment added successfully");
}
catch(err){
res.status(404).send(err.message);
}
}

export const deleteComment=async(req,res)=>{
    try{
     const commentData=await comments.findById(req.params.commentid);
    //  console.log(commentData.userId);
     const userID=commentData.userId;
     if(userID===req.user.id){
        await comments.findByIdAndDelete(req.params.commentid);
        res.status(200).send("comment deleted");
     }
     else{
        res.status(404).send("you can't delete others' comments");
     }
    }
    catch(err){
    res.status(404).send(err.message);
    }
}