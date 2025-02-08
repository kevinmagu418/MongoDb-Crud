import mongoose from "mongoose";
import { user } from "./User.js";

//passenger schema with passenger specific attributes
const passengerSchema=new mongoose.Schema({

    ridehistory:{type:String},
    paymentMethod:{type: String,}

})
// connect using the role
export const Passenger=user.discriminator("passenger",passengerSchema);