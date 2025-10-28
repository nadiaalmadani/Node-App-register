import mongoose from "mongoose";



let orderSchema = new mongoose.Schema({

    userId : { type : mongoose.Schema.Types.ObjectId, ref : "User"},
    categoryId : { type : mongoose.Schema.Types.ObjectId, ref : "Category"},
    productId : {type : mongoose.Schema.Types.ObjectId , ref : "Product"},
    quantity : {type : Number , required : true , default : 1},
    totalPrice : {type : Number },
    createdAt : {type : Date},
    status: {
        type: String,
        enum: ["pending", "initiated", "completed", "canceled", "refunded", "paid"],
        default: "pending",
    },
    email : {type : String  ,required : true , trim : true , lowercase : true  }

}) 



let Order = mongoose.model('Order' , orderSchema)
export default Order