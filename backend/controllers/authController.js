import { user } from "../Database/models/User.js";
import bcryptjs from "bcryptjs";
import { generateVerificationcode } from "../utils/generateVerificationToken.js";
import { generateTokenandSetCookie } from "../utils/generateTokenandCookie.js";
import { Driver } from "../Database/models/Driver.js";
import { Passenger } from "../Database/models/passenger.js";


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
const verificationCode=generateVerificationcode();
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
  verificationTokenExpiresAt:Date.now()+24*60*60*1000,
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
  verificationTokenExpiresAt:Date.now()+24*60*60*1000,
});
    }



    

//save the user in the database

  await newUser.save();

// generateToken and set cookie  which will be sent to the client

   generateTokenandSetCookie(res,newUser._id.toString());
res.status(201).json({success:true,message:"user created successfully" ,user:{...newUser.toObject(),password:undefined}})


   }
   catch(error){
    
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    
    
   }












};



//verify email
export const verifyEmail=()=>{}

//login controller
export const logIn=()=>{}

//logout controller
export const  logOut=()=>{}

