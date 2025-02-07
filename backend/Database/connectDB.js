import mongoose from 'mongoose';
 export const connectdb= async ()=>{

    try{
//connecting to the cluster using the connection string 
        const connect=await mongoose.connect(process.env.MONGO_URI,{
             // Recommended for parsing the connection string
            // Recommended for using the new Server Discover and Monitoring engine



        });


        console.log(`MONGODB CONNECTED:${connect.connection.host}`)
    }
    catch(error){

console.log("error connecting to mongodb:",error.message)
process.exit(1); //prevent server from crashing exit process with failure

    }
 }