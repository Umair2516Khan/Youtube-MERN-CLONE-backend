import express from "express";
import { deleteUser, dislikeVideo, getUser, likeVideo, subscribeChannel, unsubscribeChannel, updateUser } from
 "../controllers/UserController.js";

 import { verify } from "../VerifyToken.js";

const router=express.Router();

router.delete("/delete/:id",verify,deleteUser);

router.get("/find/:id",getUser);

router.put("/update/:id",verify,updateUser);

router.put("/sub/:id",verify,subscribeChannel)

router.put("/unsub/:id",verify,unsubscribeChannel)

router.put("/like/:videoid",verify,likeVideo)

router.put("/dislike/:videoid",verify,dislikeVideo)

export default router;