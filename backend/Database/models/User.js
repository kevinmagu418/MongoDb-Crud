import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
   {
     
    name: {type:String, required:true},
    email: {type:String,requeired:true,unique:true},//email should be unique for querying purpose
    password:{type:String, required:true},// stores a hashed password
    role: {type:String, enum:["client" ,"driver" , "admin"], required:true},// Role
    phoneNumber:{type:String},
    isVerified:{type:Boolean ,default:false},// For account verification
    createdAt:{type:Date ,default:Date.now},// when user registered
    updatedAt:{type: Date,default:Date.now}
  },
   {timestamps:true}

);

export const userModel=mongoose.model("User",userSchema);