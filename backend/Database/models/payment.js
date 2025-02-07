import mongoose, { Schema } from "mongoose";

 const paymentSchema=new mongoose.Schema({
    rideId: {type:String,required:true ,unique:true

    }, // Reference to ride
    studentId: {type:Schema.Types.ObjectId,ref:"Client",required:true}, 
    amount: {type:String,required:true},
    paymentMethod: {type:String},
    transactionId:{type:String},
    status:{ type:String,enum:["pending" , "completed", "failed"]},
    createdAt:{type:Date},
    updatedAt:{ type:Date}
 },{timestamps:true})

 export const paymentModel=mongoose.model("Payment",paymentSchema);