import joi from 'joi'

export let createCategory = joi.object({
    name : joi.string().min(3).max(15).lowercase().trim().required(),
})

export const  VerifyCategory = async (req , res , next)=>{
    try {
        // let data = RegisterSchema.validate(req.body)
        // console.log(data);
        let {error} = createCategory.validate(req.body)
        // console.log(error.details[0].message);
        if(error){
            let errMsg = error.details[0].message
            return res.status(403).json({message : errMsg})
        } 
        next()
        // return res.send()
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}