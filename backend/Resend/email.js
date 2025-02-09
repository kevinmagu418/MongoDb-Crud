import { Resend } from 'resend'
import { VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAILTEMPLATE } from './emailTempelate.js';
import  dotenv from 'dotenv'
dotenv.config();



//retrieve resend api key to access the sender
const resend =  new Resend(process.env.RESEND_API);

export const sendVerificationEmail= async(email,verificationToken,username)=>{




//try sending the email template to user email

try{
  const response= await resend.emails.send({
  from: ' EgerDrive<onboarding@resend.dev>',
  to: email,
  subject:"Verification Email",
  html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken).replace("{your name}",username),
  category:'Email verification'// for analytics
})

//ensure response is valid
if (!response) {
        return {sucess:false,message:"failed to send email,response is invalid"}
  }

    
// if the response has been sent
    return { success: true, message: "Verification email sent." }; 

}
catch(error){
    console.error( "error sending email",error);

     return {success:false,message:'error sending verification email'}
}



}


//welcome Email

export const sendWelcomeEmail=async(email)=>{

  try{
    const response= await resend.emails.send({
    from: ' EgerDrive<onboarding@resend.dev>',
    to: email,
    subject:"Welcome Email",
    html:WELCOME_EMAILTEMPLATE,
    category:'Welcome Email'// for analytics
  })
  
  //ensure response is valid
  if (!response) {
          return {sucess:false,message:"failed to send email,response is invalid"}
    }
  
      
  // if the response has been sent
      return { success: true, message: "welcome email sent." }; 
  
  }
  catch(error){
    console.error( "error sending email",error);

     return {success:false,message:'error sending welcome email'}
}









}