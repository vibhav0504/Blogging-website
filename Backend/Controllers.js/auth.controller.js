import User from "../Models/user.models.js";
import bcryptjs from "bcryptjs"
export const signup = async(req,res)=>{
const {userName,email,password}=req.body;
// console.log(userName)
// console.log(email)
// console.log(password)
if ([userName,email,password].some((e) => e?.trim() === "")) {
  res.send("All fields are required");
  }

const userIsExisting = await User.findOne({ $or: [ { email }] });
if(userIsExisting){
    console.log("user already registered")
   return res.send("User Already Exist")
}

const hashedPassword=bcryptjs.hashSync(password,10);
const user = await User.create({
    email,
    password:hashedPassword,
    userName: userName.toLowerCase(),
  });
  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    res.send("Something went Wrong While registering");
  }
  return res.send("User Registered Successfully");
}

