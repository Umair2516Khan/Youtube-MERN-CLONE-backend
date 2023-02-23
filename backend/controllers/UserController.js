import user from '../models/User.js';
import video from '../models/Video.js';

//update user
export const updateUser=async(req,res)=>{
if(req.params.id===req.user.id){
    try{
   const updatedUser= await user.findByIdAndUpdate(req.params.id,{
    $set:req.body
   },{new:true})
   await updateUser.save();
   res.status(200).send("user updated");
}
catch(err){
    res.status(404).json(err);
}
}
else{
    res.status(500).send("You are not allowed to update this account. You can only update your account")
}
}

//delete user
export const deleteUser=async(req,res)=>{
if(req.params.id===req.user.id){
    try{
     await user.findByIdAndDelete(req.params.id);
     res.status(200).send("user has been deleted successfully");
    }
catch(err){
    res.status(404).json(err);
}
}
else{
    res.status(500).send("You are not allowed to delete this account. You can only delete your account")
}
}

//get information of a user
export const getUser=async(req,res)=>{
    try{
const userData=await user.findById(req.params.id);
const {password,...otherdata}=userData._doc;
res.status(200).send({...otherdata});
    }
    catch(err){
        res.status(404).json(err);
    }
}

//subscriber a user
export const subscribeChannel=async(req,res)=>{
    if(req.params.id===req.user.id){
        res.status(404).send("user cannot subscribe his/her own channel");
    }
    else{
try{
    let flag1=0;
    const alreadySubscribed=await user.findById(req.user.id);
    alreadySubscribed.susbcribedTo.map((val)=>{
        if(val==req.params.id){
            flag1=1;
        }
    })
    if(flag1==0){
    await user.findByIdAndUpdate(req.user.id,{
        $push:{susbcribedTo:req.params.id}
    })
    await user.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1}
    })
    res.status(200).send("channel subscribed successfully");
    }
    else{
        res.status(200).send("channel already subscribed");
    }
}
catch(err){
    res.status(404).json(err.message);
}
    }
}

//unsubscribe a user
export const unsubscribeChannel=async(req,res)=>{
    try{
await user.findByIdAndUpdate(req.user.id,{
$pull:{susbcribedTo:req.params.id}
})
await user.findByIdAndUpdate(req.params.id,{
    $inc:{subscribers:-1}
})
res.status(200).send("channel unsubscribed successfully");
}
catch(err){
res.status(404).json(err);
}
}

//like a video
export const likeVideo=async(req,res)=>{
try{
    let flag=0;
    const videoExists=await video.findById(req.params.videoid);
    if(videoExists){
        videoExists.likes.map((val)=>{
            if(val===req.user.id){
                 flag=1;
                //  console.log("video liked already");
            }
        })
        if(flag==0){
await video.findByIdAndUpdate(req.params.videoid,{
    $push:{likes:req.user.id},
    $pull:{dislikes:req.user.id}
});
res.status(200).send("video liked!!");
        }
        else{
            res.status(200).send("video already liked");
        }
    }
    else{
        res.status(404).send("no such video exists");
    }
}
catch(err){
    res.status(404).json(err.message);
}
}

//dislike a video
export const dislikeVideo=async(req,res)=>{
    try{
        let flag=0;
        const videoExists=await video.findById(req.params.videoid);
        if(videoExists){
            videoExists.dislikes.map((val)=>{
                if(val==req.user.id){
                     flag=1;
                }
            })
            if(flag==0){
    await video.findByIdAndUpdate(req.params.videoid,{
        $push:{dislikes:req.user.id},
        $pull:{likes:req.user.id}
    });
    res.status(200).send("video dsliked!!");
            }
            else{
                res.status(200).send("video already disliked");
            }
        }
        else{
            res.status(404).send("no such video exists");
        }
    }
    catch(err){
        res.status(404).json(err.message);
    }
}