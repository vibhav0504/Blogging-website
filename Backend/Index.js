import express from "express"
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes/user.route.js";
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
app.use("/api",router);