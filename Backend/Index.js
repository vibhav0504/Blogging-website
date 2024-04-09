import express from "express"
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.routes.js";
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
app.use("/api",userRoute);
app.use("/api",authRoute);