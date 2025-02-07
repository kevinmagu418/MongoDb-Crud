import mongoose,{Schema} from "mongoose";

     const rideSchema=new mongoose.Schema({
        
        id:{type:String},
        clientId: {type:Schema.Types.ObjectId,ref:"Client",required:true},
    driverId:{type:Schema.Types.ObjectId,ref:"Driver",required:true},  // Reference to the driver assigned to the ride
    pickupLocation: {type:String},
    dropoffLocation:{type:String},
    status: { type:String, required:true,enum:["pending","accepted","in-progress" , "completed","cancelled"]},
    fare: {type:Number}, // Calculated fare for the ride
    distance: {type:Number },// Distance in km/miles
    estimatedTime: {type:Number}, // Estimated time in minutes
    startedAt: {type:Date},// When the ride started
    completedAt:{type:Date}, // When the ride ended
    createdAt: {type:Date}},{timestamps:true});
    export const rideModel=mongoose.model("Ride",rideSchema)