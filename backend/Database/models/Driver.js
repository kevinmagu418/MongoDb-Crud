//the driver schema which references the user schema
import mongoose from "mongoose";
import { user } from "./User.js";


//schema of the document
const driverSchema=new mongoose.Schema(
   {
    
    vehicleType: {type:String ,required:true},
    licensePlate: {type:String ,required:true ,unique:true},
    rating: {type:Number,default:0 },
    isAvailable: {type:Boolean ,default:true} ,// Whether the driver is available for rides
    currentLocation: { type:{lat:Number,lng:Number}}

});
// paremeters base model  and the schema this creates a sub model  that  extends  the user
   export const Driver = user.discriminator("driver",driverSchema);