import express from "express";
import { createUser, logIn } from "../controllers/AuthControllers.js";
const router=express.Router();

router.post("/signup",createUser);
router.post("/login",logIn);



export default router;