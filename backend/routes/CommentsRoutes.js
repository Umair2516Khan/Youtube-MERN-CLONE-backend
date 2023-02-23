import express from "express";
import { addComment, deleteComment, getAllComments } from "../controllers/CommentsController.js";
import { verify } from "../VerifyToken.js";
const router=express.Router();

router.get('/allcomments/:videoid',getAllComments);
router.post('/add/:videoid',verify,addComment);
router.delete('/delete/:commentid',verify,deleteComment);

export default router;