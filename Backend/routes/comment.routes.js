import express from "express"
const  router=express.Router()
import { createComment } from "../Controllers.js/comment.controller.js"
import {verifyToken} from "../utils/verifyUser.js"
router.post("/createcomment",verifyToken,createComment);


export default router;