import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(`mongodb://localhost:27017/PayPort`,{
            useNewUrlParser:true,
        });

        console.log("MOngoDB CONNECTED")
    }
    catch(error){
        console.log(error.message)
        process.exit()
    }
}

export default connectDB;