import mongoose from "mongoose";


const productsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    category : {
        type : String , trim : true , required : true , lowercase : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    name : {
        type : String , trim : true , lowercase : true , required : true
    },
    image : {
        type : String,
    },
    description : {
        type : String , 
        trim : true 
    },
    quantity : {type : Number , default : 1},
    discount : {type : Number  , default : 0},
    price : {type : Number },
    createdAt : {type : Date}
})

const Products = mongoose.model('Product' , productsSchema)
export default Products