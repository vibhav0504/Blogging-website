import express from "express"
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.routes.js";
import postRoute from "./routes/post.routes.js"
import commentRoute from "./routes/comment.routes.js";
import cookieParser from "cookie-parser";
const app=express();
mongoose.connect( process.env.CONNECTION_URL)
.then(()=>{
        console.log("Database connected Successfully")
    app.listen(process.env.PORT,()=>{
        console.log(`App is running at port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(error.message)
})
app.use(express.json());
app.use(cookieParser())
app.use("/api",userRoute);
app.use("/api",authRoute);
app.use("/api",postRoute);
app.use("/api",commentRoute);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal server error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})