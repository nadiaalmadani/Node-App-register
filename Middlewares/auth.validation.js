import {loginValidation , registerValidation} from '../Services/userValidation.js'


function registerVerify (req , res , next){
    try {
        // let data = RegisterSchema.validate(req.body)
        // console.log(data);
        let {error} = registerValidation.validate(req.body)
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
function loginVerify (req , res , next){
    try {
        // let data = RegisterSchema.validate(req.body)
        // console.log(data);
        let {error} = loginValidation.validate(req.body)
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

export {
    registerVerify , loginVerify
}