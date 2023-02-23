import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
       type:String,
       required:true
    },
    desc:{
      type:String,
      required:true
    },
    videoURL:{
        type:String,
        required:true
    },
    imgURL:{
       type:String,
       reuquired:true
    },
    user_pic:{
        type:String,
        default:""
    },
    views:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        default:[]
    },
    no_of_likes:{
    type:Number,
    default:0
    },
    no_of_dislikes:{
        type:Number,
        default:0
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },

},{timestamps:true})

export default mongoose.model("video",videoSchema);