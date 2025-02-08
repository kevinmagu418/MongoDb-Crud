import express from "express";
import { signUp,logIn,logOut,verifyEmail } from "../controllers/authController.js";

const router=express.Router();

router.post("/signup",signUp);
router.post("/verifyemail",verifyEmail);
router.post("/login",logIn);
router.post("/logout",logOut);


export default router;




//post request used to  send or update data to the server its more secure than get request