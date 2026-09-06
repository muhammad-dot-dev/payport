import mongoose from "mongoose"

const {Schema , model} = mongoose;

const paymentSchema = new Schema({
    name: {type:String , required:true},
    to_user: {type:String , required:true},
    orderId: {type:String},
    message: {type:String},
    amount: {type:Number , required:true},
    updatedAt: {type:String , default:Date.now},
    createdAt: {type:String , default:Date.now},
    done: {type:Boolean , default:false},
})


export default  mongoose.models.Payment || model("Payment" , paymentSchema)  ;