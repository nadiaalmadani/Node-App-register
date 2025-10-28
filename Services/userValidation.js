import joi from 'joi'

let registerValidation = joi.object({
    firstName : joi.string().min(3).max(15).lowercase().required(),
    lastName : joi.string().min(3).max(15).lowercase().required(),
    email : joi.string().email().min(3).trim().lowercase().required(),
    password : joi.string().min(8).max(20).trim().required(),
    role : joi.string().trim(),
})

let loginValidation = joi.object({
    email : joi.string().email().min(3).trim().lowercase().required(),
    password : joi.string().min(8).max(20).trim().required(),
})

export {
    registerValidation , loginValidation
}