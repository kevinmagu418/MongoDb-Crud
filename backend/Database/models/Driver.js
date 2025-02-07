//the driver schema which references the user schema
import mongoose from "mongoose";
import { Schema } from "mongoose";

//schema of the document
const driverSchema=new mongoose.Schema(
   {
    driverId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    vehicleType: {type:String ,required:true},
    licensePlate: {type:String ,required:true ,unique:true},
    rating: {type:Number,default:0 },
    isAvailable: {type:Boolean ,default:true} ,// Whether the driver is available for rides
    currentLocation: { type:{lat:Number,lng:Number}}

},{timestamps:true});

   export const driverModel=mongoose.model("Drivers",driverSchema);