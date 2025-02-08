// this function generate jwt token and sets a cookie to be sent to the client browser
 import jwt  from "jsonwebtoken";

 export const generateTokenandSetCookie=(res,userId)=>{

    if (!userId) {
        return  res.status(500).json({message:"User ID is required to generate token"});
      }
    



//sign the token with secret key  the payload object, secretkey and options
const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});

//set the cookie to store the token and send it a response to the client browser
     res.cookie("Authcookie",token,{

     httpOnly:true,// cookies can only be accessed through  http methods and js preventing cross scripting attacks
    sameSite:"strict",
    secure:process.env.NODE_ENV=="production", // this ensures  that the cookie  is  transmitted only in https during production

    MaxAge:7*24*60*60*60*24,// making it persistent

     })

return token;




 }