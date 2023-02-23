import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from './routes/AuthRoutes.js';
import UserRouter from './routes/UserRoutes.js';
import VideoRouter from './routes/VideoRoutes.js';
import CommentRouter from './routes/CommentsRoutes.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();
app.use(cors({origin:'http://localhost:3000',credentials:true}));
dotenv.config();
app.use(express.json());
app.use(cookieParser());

mongoose.set('strictQuery', false);

const createConnection=()=>{
mongoose.connect(process.env.DB_KEY).then(()=>{
console.log("DATABASE CONNECTED");
}).catch((err)=>{throw err;})
}

// app.use(cookieParser());

app.use("/api/auth",AuthRouter);
app.use("/api/user",UserRouter);
app.use("/api/video",VideoRouter);
app.use("/api/comments",CommentRouter);

app.listen(8000,()=>{
console.log("Backend working!!");
createConnection();
})