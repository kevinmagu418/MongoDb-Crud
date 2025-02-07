// base interface User encompasses  common behaviour other interfaces extend this behaviour
// interfaces for typesafety
import mongoose from "mongoose";


 export interface User {
    _id:mongoose.Types.ObjectId; // MongoDB automatically generates this auto  incremental
    name: string;
    email: string;
    password: string; // stores a hashed password
    role: "client" | "driver" | "admin"; // Role-based differentiation
    phoneNumber?: string; // ? Optional field
    isVerified: boolean; // For account verification
    createdAt: Date;// when user registered
    updatedAt: Date;// last write to the document
  }

// interface client extends user interface

  interface  client  extends User{
    ridehistory:string[] // an array of strings of ride ids
    paymentMethod:string[]; //an array of payment method ids
  }


  //interface Driver extends  user behaviour
  interface Driver extends User {
    userId:mongoose.Types.ObjectId;
    vehicleType: string; // e.g., car shuttle
    licensePlate: string;
    rating?: number; // Average rating from students based on rating metric
    isAvailable: boolean; // Whether the driver is available for rides
    currentLocation?: { lat: number; lng: number }; // For real-time tracking an oblect with latitude and longitude properties
  }

  // interface Admin  
  interface Admin extends User {
      //future use
  }
  