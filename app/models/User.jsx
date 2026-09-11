import mongoose, { mongo } from "mongoose";
import { stringify } from "node:querystring";

const {Schema , model} = mongoose;

const userSchema = new Schema({
    email: {type:String , required:true},
    name: {type:String },
    username: {type:String , required:true},
    profilePic: {type:String},
    coverPic: {type:String},
    razorpayKeyId: {type:String},
    razorpayKeySecret: {type:String},
    createdAt: {type:Date , default:Date.now},
    updatedAt: {type:String , default:Date.now},
})

export default  mongoose.models.User || model("User" , userSchema)  ;