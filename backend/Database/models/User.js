import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
   {
     
    username: {type:String, required:true},
    email: {type:String,requeired:true,unique:true},//email should be unique for querying purpose
    password:{type:String, required:true},// stores a hashed password
    role: {type:String, enum:["passenger" ,"driver" , "admin"], required:true},// Role 
    isVerified:{type:Boolean ,default:false},// For account verification
    verificationCode:{type:String,required:false},
    verificationTokenExpiresAt:{type:Date,required:false}
  },
   {timestamps:true ,discriminatorKey:"role"}

);
   




export const user=mongoose.model("User",userSchema);