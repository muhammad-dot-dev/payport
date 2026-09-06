import mongoose, { mongo } from "mongoose";

const {Schema , model} = mongoose;

const userSchema = new Schema({
    email: {type:String , required:true},
    name: {type:String , required:true},
    username: {type:String , required:true},
    profilePic: {type:String},
    coverPic: {type:String},
    createdAt: {type:Date , default:Date.now},
    updatedAt: {type:String , default:Date.now},
})


const User = model("User" , userSchema)