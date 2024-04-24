import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import User from "../Models/user.models.js"
export const test=(req,res)=>{
    res.send("Api is working")
}

export const updateUser=async(req,res,next)=>{
  
    if(req.user.id!==req.params.userId){
        console.log(11);
        return next (errorHandler(403, "You are not allowed to update the user"))
    }
    if(req.body.password){
        if(req.body.password.length<6){
       
            return next (errorHandler(400, "Password must be of atleast 6 character"))
        }
        req.body.password=bcrypt.hashSync(req.body.password,10);
    }
    if(req.body.userName){
        if(req.body.userName.length<7 || req.body.userName.length>20){    
            return next (errorHandler(400, "userName must be b/w 7 to 20  character"))
        }
        if(req.body.userName.includes(" ")){
      
            return next (errorHandler(400, "username can't have space"))
        }
        if(req.body.userName!==req.body.userName.toLowerCase()){
            return next (errorHandler(400, "username must be lowercase"))
        }
        if(!req.body.userName.match(/^[a-zA-Z0-9]+$/ )){
            return next (errorHandler(400, "username can only contain number and letters"))
        }
    }
        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    userName:req.body.userName,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture, 
                }
            },{new:true});
            const{password,...rest}=updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error)
        }
    }

export const deleteUser=async(req,res,next)=>{
        if(req.user.id!==req.params.userId){
            return next(errorHandler (403 ,"You are not authorized to delete this account" ));
        }
        try {
           const deletedUser= await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("User deleted Successfully")
        } catch (error) {
            next(error)
        }
    }

export const signout=async(req,res,next)=>{
try {
res.clearCookie("access_token").status(200).json("User has been signed out")
} catch (error) {
    next(error)
}
}
