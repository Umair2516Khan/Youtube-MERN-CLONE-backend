import video from '../models/Video.js';
import user from '../models/User.js';

//create a new video
export const createVideo=async(req,res)=>{
    try{
    const user_pic=await user.findById(req.user.id);
    const picU=user_pic.image;
    // console.log(picU);
     const newVideo = new video({...req.body,userId:req.user.id,user_pic:picU})
     await newVideo.save();
     res.status(200).send(newVideo);
    }
    catch(err){
      res.status(404).json(err);
    }
}

//update a video
export const updateVideo=async(req,res)=>{
const videoInfo=await video.findById(req.params.id);
if(videoInfo.userId=req.user.id){
try{
const updateVideo=await video.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true})
res.status(200).send("video updated successfully");
}
catch(err){
res.status(404).json(err.message);
}
}
else{
    res.status(404).send("you can update only your own video!!");
}
}

//delete a video
export const deleteVideo=async(req,res)=>{
    const videoInfo=await video.findById(req.params.id);
if(videoInfo.userId=req.user.id){
try{
const updateVideo=await video.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{new:true})
res.status(200).send("video updated successfully");
}
catch(err){
res.status(404).json(err.message);
}
}
else{
    res.status(404).send("you can delete only your own video!!");
}
}

//get a video
export const getVideo=async(req,res)=>{
    try{
    const videoInfo=await video.findById(req.params.id);
    if(videoInfo){
        res.status(200).send(videoInfo);
    }
    else{
        res.status(404).send("no such video exists");
    }
    }
    catch(err){
    res.status(404).json(err.message)
    }
}

//views increase 
export const viewIncrease=async(req,res)=>{
 try{
    const videoInfo=await video.findById(req.params.id);
    if(videoInfo){
        await videoInfo.update({
            $inc:{views:1}
        },{new:true})
        res.status(200).send(videoInfo);
    }
    else{
        res.status(404).send("no such video exists");
    }
    } 
 catch(err){
    res.status(404).json(err.message);
 }
}

//get videos of subscribed users
export const getSubscribedVideo=async(req,res)=>{
    try{
    //     let videoArray=[];
      const userInfo=await user.findById(req.user.id);
    // const values= userInfo.susbcribedTo.map(async(userid)=>{
    //      const videosInfo=await video.find({userId:userid});
    //     videosInfo.map((val)=>{ 
    //         return val.title;
    //      })

    //     }
    //   )
    // const videoss=await Promise.all(values);
    // console.log(videoss);
    //   res.status(200).send(videoss);
    const videoss=await Promise.all(
        userInfo.susbcribedTo.map((subscribedUserid)=>{
           return video.find({userId:subscribedUserid});
        })
    )
    let videoTitles=[];
    videoss.forEach((val)=>{
        videoTitles.push(val[0].title);
        // console.log(val[0].title);
    })
    // res.status(200).send(videoTitles);
    res.status(200).send(videoss.flat().sort((a,b)=>{
        return b.createdAt-a.createdAt
    }));
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

//get top/trending videos
export const topVideos=async(req,res)=>{
    try{
        //in mongodb sort() method we use -1 for descendingg and 1 for ascending order
       const topVideo=await video.find().sort({views:-1});
       res.status(200).send(topVideo);
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

//get random videos
export const randomVideos=async(req,res)=>{
    try{
     const randomVideo=await video.aggregate([{$sample:{size:4}}]);
    res.status(200).send(randomVideo);
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

//search by title
export const searchByTitile=async(req,res)=>{
    try{
     const video_by_title=await video.find({title:req.body.title});
     if(video_by_title){
        res.status(200).send(video_by_title);
     }
     else{
        res.status(404).send("no video exists with such title");
     }
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

//get videos by tags
export const getTags=async(req,res)=>{
    try{
        // console.log(req.body.tags);
        let videoByTags=[];
    //   for(let i=0;i<req.body.tags.length;i++){
       const videos= await video.find({tags:{$in:req.body.tags}}).limit(15);
    //    videoByTags.push(videoo);
    //   }
      res.status(200).send(videos);
       
    }
    catch(err){
        res.status(404).json(err.message);
    }
}

export const like_a_Video=async(req,res)=>{
    try{
        const user_info=await user.findById(req.user.id);
        let flag=0;
        user_info.likedVideos?.forEach((val)=>{
            if(val===req.params.videoid){
                flag=1;
            }
        })
        if(flag===0){
     await video.findByIdAndUpdate(req.params.videoid,{
        $inc:{no_of_likes:1}
     });
     await user.findByIdAndUpdate(req.user.id,{
        $push:{likedVideos:req.params.videoid},
        $pull:{dislikedVideos:req.params.videoid}
     })
     res.status(200).send("video liked successfully");
    }
    else{
     await video.findByIdAndUpdate(req.params.videoid,{
        $inc:{no_of_likes:-1}
     })   
     await user.findByIdAndUpdate(req.user.id,{
        $pull:{likedVideos:req.params.videoid}
     })
     res.status(200).send("like removed successfully");
    }
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

export const dislike_a_Video=async(req,res)=>{
    try{
        const user_info=await user.findById(req.user.id);
        let flag=0;
        user_info.dislikedVideos?.forEach((val)=>{
            if(val===req.params.videoid){
                flag=1;
            }
        })
        if(flag===0){
     await video.findByIdAndUpdate(req.params.videoid,{
        $inc:{no_of_dislikes:1}
     });
     await user.findByIdAndUpdate(req.user.id,{
        $push:{dislikedVideos:req.params.videoid},
        $pull:{likedVideos:req.params.videoid}
     })
     res.status(200).send("video disliked successfully");
    }
    else{
     await video.findByIdAndUpdate(req.params.videoid,{
        $inc:{no_of_dislikes:-1}
     })   
     await user.findByIdAndUpdate(req.user.id,{
        $pull:{dislikedVideos:req.params.videoid}
     })
     res.status(200).send("disliked removed successfully");
    }
    }
    catch(err){
        res.status(404).send(err.message);
    }
}