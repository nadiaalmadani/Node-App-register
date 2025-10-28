import mongoose from "mongoose";

let categorySchema = new mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref : "User"} , 
    name : {type : String , unique : true , lowercase : true },
    createdAt  : Date , 
})

let Category = mongoose.model('Category' , categorySchema)
export default Category