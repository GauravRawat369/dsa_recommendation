import mongoose from "mongoose";

const connectToMongodb = async() =>{
    try {
        // console.log(process.env.MONGO_DB_URL)
        await mongoose.connect(process.env.MONGO_DB_URL,{
            ssl: true,  // Ensure SSL is enabled
        })
        
        console.log("connected to Mongo db");
    } catch (error) {
        console.log("Error in connectToMongodb", error)
    }
}
export default connectToMongodb; 
