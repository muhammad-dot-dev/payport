// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try{
//         const conn = await mongoose.connect(`mongodb://localhost:27017/PayPort`,{
//             useNewUrlParser:true,
//         });

//         console.log("MOngoDB CONNECTED")
//     }
//     catch(error){
//         console.log(error.message)
//         process.exit()
//     }
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;