import Category from "../Model/Category.model.js";
import Products from "../Model/Products.model.js";
import ApiError from "../Utils/ApiError.js";
import fs from 'fs'

export const createProduct = async (req , res , next)=>{
    try {
        let product = req.body 

        let category = await Category.findOne({name : product.category})
        if (!category)
            return res.status(404).json({status : "fail" , data :  `No Category Name Match This Name : ${product.category}`})

        let productData = { 
            userId : req.session._id,
            category : product.category,
            categoryId : category._id,
            name : product.name,
            image : req.file ? `/api/images/${req.file.filename}` : "Can't Upload Image" ,
            description : product.description,
            quantity : 1,
            discount : 0,
            price : product.price,
            createdAt : new Date().toISOString()
        }

        let newProduct = new Products(productData)
        await newProduct.save()
        res.status(201).json({status : "success" , data : newProduct})
    } catch (error) {
        console.log(error);
        next(new ApiError(`Error From Create Product ` , 500 ))
        
    }
}


export const getAllProducts = async (req , res , next )=>{
    try {
        let products = await Products.find()
        if (! products)
            return res.status(404).json({status : "fail" , data : `No Products In This Category`})

        res.status(200).json({status : "success" , data : products})
    } catch (error) {
        next(new ApiError(`Error From Get All Products` , 500 ))
        
    }
}

export const getProductById = async (req , res , next )=>{
    let {id} = req.params
    try {
        let product = await Products.findById(id)
        if (!product)
            return res.status(404).json({status : "fail" , data : `No Product With This ID : ${id}`})

        res.status(200).json({status : "success" , data : product})
    } catch (error) {
        next( new ApiError(`Error From Get Product By Id ` , 500))
        
    }
} 

export const deleteProduct = async (req , res , next )=>{
    let {id} = req.params
    try {
        let product = await Products.findByIdAndDelete(id)
        if (!product )
            return res.status(404).jsom({status : "fail" , data : `No Product With This ID : ${id}`})

        res.status(200).json({status : 'success' , Deletedproduct : product })
        
    } catch (error) {
        next( new ApiError(`Error From Delete Product By ID ` , 500))
        
    }
}

export const updateProduct = async (req , res , next)=>{
    let newData = req.body
    let {id} = req.params

    try {
        let product = await Products.findById(id)
        if (! product )
            return res.status(404).json({status : "fail" , data : `No Product With This ID  : ${id}`})


        if (req.file){
            var imageName = product.image?.split('/')[3]
            let deleteOldImage = `./uploads/${imageName}`
            fs.unlinkSync(deleteOldImage)

            var imagePath = `/api/images/${req.file.filename}`
        }
        let updateProduct =  await Products.findByIdAndUpdate(id , {...newData , image : imagePath} , {new : true} )

        res.status(200).json({status : "success" , data : updateProduct})

    } catch (error) {
        console.log(error);
        
        next(new ApiError(`Error From Update Product ` , 500))
    }
}