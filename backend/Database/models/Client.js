import mongoose,{Schema} from "mongoose";
const clientSchema=new mongoose.Schema({
    clientId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    ridehistory:{type:String},
    paymentMethod:{type: String,}

})