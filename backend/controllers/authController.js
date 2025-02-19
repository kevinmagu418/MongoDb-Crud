import { user } from "../Database/models/User.js";
import bcryptjs from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationToken.js";
import { generateTokenandSetCookie } from "../utils/generateTokenandCookie.js";
import { Driver } from "../Database/models/Driver.js";
import { Passenger } from "../Database/models/passenger.js";
import { sendVerificationEmail } from "../Resend/email.js";
import { sendWelcomeEmail } from "../Resend/email.js";

//controllers encapsulate logic
export  const  signUp=async(req,res)=>{

   try{

   const{username,email,password,role,vehicleType,licensePlate}=req.body;

   // if any of the fields is missing throw an error
   if(!username || !email || !password  || !role){
     return res.status(400).json({success:false,message:"Error:All fields are required"})


   }
//check if the userAlready exits in the database by using a unique property

 const userAlreadyExits= await user.findOne({email:email})
  if (userAlreadyExits){
// if he exits throw an error

return res.status(400).json({success:false,message:"user alread exits in the system"})



  }
// hash the password  await since it takes time the unhashed password and salt number. the greater the salt number
const hashedPassword= await bcryptjs.hash(password,12);


//generate verification code to be sent to the user email with an expiration date
const verificationCode=generateVerificationCode();
// create a new  user in the database

 let newUser;
  
 if(role==="driver"){
    //ensure driver-specific fields are provided
    if(!vehicleType || !licensePlate){

       return res.status(400).json({success:false,message:"vehicle type and license are required for drivers"});
    }

    //if fields are presnt create new driver using a discriminator
  newUser=new Driver({
  username,
  email,
  password: hashedPassword,
  role,
  verificationCode,
  verificationTokenExpiresAt:new Date(Date.now()+24*60*60*1000),
  vehicleType,
  licensePlate, 

  })
    }
// if the role is a passenger
    else{
//create a passenger 
newUser=new Passenger({
username,
  email,
  password: hashedPassword,
  role,
  verificationCode,
  verificationTokenExpiresAt: new Date(Date.now()+9*60*60*1000,)
});
    }



    

//save the user in the database

  await newUser.save();

// generateToken and set cookie  which will be sent to the client payload is the new user i created

  await  generateTokenandSetCookie(res,newUser._id.toString());
//send verification email to user
   const emailResponse=await sendVerificationEmail(newUser.email,newUser.verificationCode,newUser.username);
   if (!emailResponse.success) {
    console.error("Email sending failed:", emailResponse.message);
    return res.status(500).json({ success: false, message: "User created but email sending failed" });
  } 
res.status(201).json({success:true,message:"user created successfully" ,user:{...newUser.toObject(),password:undefined}})


   }
   catch(error){
    
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    
    
   }


};

//VERIFY EMAIL

//verify email :after the user receives the verify email  he choose to  verify
export const verifyEmail=async(req,res)=>{
//destructure verification code from the req.body
   const{code}=req.body;

try{
//locate the user with verification code and check if is still valid
const userWithCode= await user.findOne({verificationCode:code,verificationTokenExpiresAt:{$gt:Date.now()}})
//if not valid or expired
if(!userWithCode){

return res.status(400).json({success:false,message:'invalid  or expired verification code '})

}
// if the code matches the user is verified set the isVerified property to true ,
userWithCode.isVerified=true;
userWithCode.verificationTokenExpiresAt=undefined;
userWithCode.verificationCode=undefined;
//save changes to the specific user document
await userWithCode.save();
  try{
await sendWelcomeEmail(userWithCode.email);
  }

  catch(error){
    console.error("Error sending welcome email:", error);

  }

  res.status(200).json({message:"welcome email sent",success:true})
}


catch(error){

  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });


}


}

//login controller:login an already registered user
export const logIn=async(req,res)=>{
  //destructure login credentials from request body
  const {email,password}=req.body;



try{

    //check if the user exits in the  system
    //verify email address
    const User= await user.findOne({email:email});

if(!User){
//if the user does not exist return an error response
   return res.status(400).json({success:false,message:"invalid credentials"}); 

}
//verify the password by comparing the password in database vs the one entered by user
const isPasswordValid=await bcryptjs.compare(password,User.password);
//bcryptjs firsts decodes and then compares

if(!isPasswordValid){
  return res.status(400).json({success:false,message:"invalid password"});
}
//else it login the user by setting jwt cookie

generateTokenandSetCookie(res,User._id.toString());

//update user last login

User.updatedAt=new Date();

await User.save();
res.status(200).json({ success: true, message: "Login successful" , user: { ...User.toObject(), password: undefined } });
}


 catch(error){

console.log("Error in login",error);

res.status(500).json({success:false,message:"Internal server Error"});
  
 }

  






}








//logout controller-encompases logout logic which is just clearing the cookie from browser

export const  logOut=async(req,res)=>{
    try{

res.clearcookie("Authcookie");//name of the cookie
 return res.status(200).json({message:"successfully log out"});
    }  
    catch(error){
      console.error("error deleting cookie")
    }

}

