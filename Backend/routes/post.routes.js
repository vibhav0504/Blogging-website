import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
const  router=express.Router()
import { create , getPosts , deletePost } from "../Controllers.js/post.controller.js"

router.post("/create",verifyToken,create);
router.get("/getposts",getPosts)
router.delete("/deletepost/:postId/:userId",verifyToken,deletePost)

export default router;