import express from "express";
import { createVideo, deleteVideo, dislike_a_Video, getSubscribedVideo, getTags, getVideo, like_a_Video, randomVideos, searchByTitile, topVideos, updateVideo, viewIncrease } from "../controllers/VideoController.js";
import {verify} from "../VerifyToken.js";
const router=express.Router();

router.post('/create',verify,createVideo);

router.put('/update/:id',verify,updateVideo)

router.delete('/delete/:id',verify,deleteVideo);

router.get('/find/:id',getVideo);

router.put('/view/:id',viewIncrease);

router.get('/getSub',verify,getSubscribedVideo);

router.get('/top',topVideos);

router.get('/random',randomVideos);

router.post('/search/title',searchByTitile);

router.post('/tags',getTags);

router.put('/likevideo/:videoid',verify,like_a_Video);

router.put('/dislikevideo/:videoid',verify,dislike_a_Video);

export default router;