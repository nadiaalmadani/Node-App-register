import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        lowercase : true,
        minLength : [3 , 'FirstName Must Be More Than 3 Characters'],
        required : true
    },
    lastName : {
        type : String,
        trim : true,
        lowercase : true,
        minLength : [3 , 'LastName Must Be More Than 3 Characters'],
        required : true
    },
    email  : {
        type : String,
        required : true ,
        trim : true ,
        lowercase : true,
        minLength : [3 , 'Email Must Be More Than 3 Characters'],
        unique : true,
        // validate : {
        //     validator : function (value){
        //         return /^[a-zA-Z]{3,12}[0-9]{0,9}(@)(gmail|yahoo)(.com)/$.test(value) 
        //     },
        //     message : (value)=> `${value} is not valid email`
        // }
    },
    password :  {
        type : String,
        trim : true,
        minLength : [8, 'Password Must Be Complex'],
        required : true
    },
    role : {
        type : String,
        enum : ["user" , "admin"],
        default : "user"
    },
    resetCode : {type : String},
    createdAt : {type : String}
})


userSchema.pre('save' , async function (next) {
    const user = this 
    if (! user.isModified('password')){
        return next()
    }
    user.password = await bcryptjs.hash(user.password , 8)
    next()
})


const User = mongoose.model('User' , userSchema)

export default User