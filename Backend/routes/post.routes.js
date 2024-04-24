import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
const  router=express.Router()
import { create } from "../Controllers.js/post.controller.js"

router.post('/create',verifyToken,create)

export default router;