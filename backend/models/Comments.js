import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
userId:{
    type:String,
    requred:true
},
videoId:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true
}
},{timestamps:true})

export default mongoose.model("comments",commentSchema)