import { emailOptions } from "../Middlewares/orderEmail.js";
import Order from "../Model/Order.model.js";
import Products from "../Model/Products.model.js";
import ApiError from "../Utils/ApiError.js";

function calculateTotalPrice (product , qty) {
    let price = product.price
    if (product.discount > 0){
        price = price - (price  * product.discount) / 100
    }
    return price * qty
}

export const createOrder = async (req , res , next)=>{
    let {productId} = req.params
    let {quantity , email} = req.body
    try {
        let product = await Products.findById(productId)                
        if ( !product)
            return res.status(400).json({status : "fail" , data : `No Product With This ID : ${productId}`})

        
        let orderData  = {
            userId : req.session._id,
            categoryId : product.categoryId,
            productId : productId,
            quantity : quantity,
            totalPrice : calculateTotalPrice(product , quantity),
            status : "pending",
            createdAt : new Date().toISOString(),
            email : email
        } 

        let newOrder = new Order(orderData)
        await newOrder.save()
        res.status(200).json({status: "success" , data : newOrder})
        
        emailOptions(email , newOrder.status , newOrder.totalPrice )

    } catch (error) {
        console.log(error);
        
        next(new ApiError(`Error From Create Order ` , 500))
    }
}


export const getAllOrders = async (req ,res , next)=>{
    try {
        let allOrders = await Order.find()
        if (! allOrders){
            return res.status(404).json({status : "fail" , data : `No Orders Added Yet `})
        }

        res.status(200).json({status : "fail" , data : allOrders})
        
    } catch (error) {
        next( new ApiError(`Error From Get All Orders` , 500))
    }
}

export const getOrderById = async (req , res , next )=>{
    let {orderId} = req.params
    try {
        let order = await Order.findById(orderId)
        if (!order)
            return res.status(404).json({status : "fail" , data : `No Order With This ID : ${orderId}`})

        res.status(200).json({status : "success" , data : order})
    } catch (error) {
        next( new ApiError(`Error From Get Order By Id ` , 500))
        
    }
}

export const deleteOrderById = async (req ,res , next )=>{
    let {orderId} = req.params
    try {
        let order = await Order.findByIdAndDelete(id)
        if (!order )
            return res.status(404).jsom({status : "fail" , data : `No Order With This ID : ${orderId}`})

        res.status(200).json({status : 'success' , Deletedproduct : order })
        
    } catch (error) {
        next( new ApiError(`Error From Delete Order By ID ` , 500))
        
    }
}

export const updateOrder = async (req , res , next)=>{
    let {orderId} = req.params
    let newOrder = req.body
    try {
        let oldOrder = await Order.findById(orderId)
        if (!oldOrder)
            return res.status(400).json({status : "fail" ,data : `No Order With This ID : ${orderId}`})

        if (newOrder.quantity){
            var product = await Products.findById(oldOrder.productId)
            var newTotal = calculateTotalPrice(product , newOrder.quantity)
        }
        let updatedOrder = await Order.findByIdAndUpdate(orderId , {...newOrder , totalPrice : newTotal} , {new : true})

        res.status(200).json({status : "success" , data : updatedOrder})

        emailOptions(updatedOrder.email , updatedOrder.status , updatedOrder.totalPrice)
    } catch (error) {
        console.log(error);
        
        next(new ApiError(`Error From Update Order`))
    }
}