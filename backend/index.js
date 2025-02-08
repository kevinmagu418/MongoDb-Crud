import express from 'express';
import {connectdb} from './Database/connectDB.js';
import dotenv from "dotenv" ;
import router  from "./Routes/auth.route.js"
    //env congiguration
dotenv.config();
//intialize express app
const app=express();
const port=process.env.PORT || 5000;

//middleware to parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//midddleware to handle auth routes
app.use('/api/auth' ,router);//routes middleware psth  the middleware







app.listen(port,async()=>{
//connect to database
   try{
     await connectdb();
    console.log(`server is actively listen for requests port no ${port}`);
   }

   catch(error){
    console.error('failed to start the server:',error)
   }
})