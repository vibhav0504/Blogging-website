import express from "express"
const  router=express.Router()
import { createComment , getComments } from "../Controllers.js/comment.controller.js"
import {verifyToken} from "../utils/verifyUser.js"
router.post("/createcomment",verifyToken,createComment);
router.get("/getcomments/:postId",getComments)

export default router;