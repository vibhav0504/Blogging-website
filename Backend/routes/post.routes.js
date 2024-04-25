import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
const  router=express.Router()
import { create , getPosts } from "../Controllers.js/post.controller.js"

router.post("/create",verifyToken,create);
router.get("/getposts",getPosts)

export default router;