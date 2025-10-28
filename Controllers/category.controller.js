import Category from "../Model/Category.model.js";
import ApiError from "../Utils/ApiError.js";


export const createCategory = async (req , res , next )=>{
    try {
        let {name} = req.body
        console.log(name);
        console.log(req?.session._id);
        
        let categoryData = {
            userId : req.session?._id,
            name : name,
            createdAt : new Date().toISOString()
        }

        // Must be unique
        let category = await Category.findOne({name : categoryData.name})
        if (category)
            return res.status(400).json({status : "fail" , data : `Category With This Name : ${name} Already Exists`})

        
        let newCategory = new Category(categoryData)
        newCategory.save()
        res.status(201).json({staus : "success" , data : newCategory})

    } catch (error) {
        console.log(error);
        
        next(new ApiError(`Error From Create Category ` , 500))
    }
}

export const getCategories = async (req , res , next )=> {
    try {
        let allData = await Category.find()
        if (!allData)
            return res.status(404).json({status : "fail" , data : `No Categories Inserted Yet `})

        res.status(200).json({status : "success" , data : allData})

    } catch (error) {
        next( new ApiError(`Error From Get ALl Categories ` , 500))
    }
}

export const getCategoryById = async (req , res , next) =>{
    let {id} = req.params
    try {
        let category = await Category.findById(id)
        if (!category)
            return res.status(404).json({status : "fail" , data : `No Category With This ID : ${id}`})

        res.status(200).json({status : "success" , data : category})
    } catch (error) {
        next( new ApiError(`Error From Get  Category By Id ` , 500))
        
    }
}

export const  deleteCategory = async (req , res , next )=>{
    let {id} = req.params
    try {
        let category = await Category.findByIdAndDelete(id)
        if (!category )
            return res.status(404).jsom({status : "fail" , data : `No Category With This ID : ${id}`})

        res.status(200).json({status : 'success' , DeletedCategory : category })
        
    } catch (error) {
        next( new ApiError(`Error From Get ALl Categories ` , 500))
        
    }
}