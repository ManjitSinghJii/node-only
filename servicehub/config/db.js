import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async ()=> {
    try{
        await mongoose.connect(ENV.MONGO_URL);
        console.log("DB Connected...")
    }
    catch(err){
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
}