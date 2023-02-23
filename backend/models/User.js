import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    subscribers:{
        type:Number,
        default:0
    },
    susbcribedTo:{
        type:[String],
        default:[]
    },
    likedVideos:{
        type:[String],
        default:0
    },
    dislikedVideos:{
        type:[String],
        default:0
    }
},{timestamps:true})

export default mongoose.model("user",userSchema)