import express from "express"
import { createComment , getComments , likeComment , editComment } from "../Controllers.js/comment.controller.js"
import {verifyToken} from "../utils/verifyUser.js"
const  router=express.Router()
router.post("/createcomment",verifyToken,createComment);
router.get("/getcomments/:postId",getComments)
router.put('/likecomment/:commentId',verifyToken,likeComment)
router.put('/editcomment/:commentId',verifyToken,editComment)
export default router;