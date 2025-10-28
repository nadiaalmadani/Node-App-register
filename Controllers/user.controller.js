import User from "../Model/User.model.js";
import ApiError from "../Utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import {mail_option , randomCode , sendMail , transporter } from '../Middlewares/email.js'

// Register
export const register = async (req, res, next) => {
  try {
    let user = req.body;
    let deplicatedEmail = await User.findOne({ email: user.email });
    if (deplicatedEmail) {
      return res
        .status(400)
        .json({ status: "Fail", data: "Email is ready exists" });
    }

    user.createdAt = new Date().toISOString();
    let newUser = new User(user);
    await newUser.save();

    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    console.log(error);

    next(new ApiError(`Error From Create User `, 500));
  }
};


// Login
export const login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email || !password)
        return res.status(400).json({status : "fail" , data : `You Must Send Email And Password`})


        let user = await User.findOne({ email: email });
        if (!user)
            return res.status(404).json({status : "fail" , data : `Email or Password is not correct`})

        let userPasswrod = await bcryptjs.compare(password, user.password);
        if (!userPasswrod)
            return res.status(404).json({status : "fail" , data : `Email or Password is not correct`})


        let token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.SECRET,
        { expiresIn: "1d" }
        );

        res.status(200).json({
        status: "Success",
        token: token,
        });
    } catch (error) {
        console.log(error);
        
        next(new ApiError(`Error From Login `, 500));
    }
};



export const forgetPassword = async (req , res , next )=>{
  const {email} = req.body
  const user = await User.findOne({email})
  if (!user)
    return res.status(404).json({status : "fail" , data : "No User With This Email"})

  // Store Id Of User
  req.session._id = user._id
  console.log(req.session._id);
  

  // Generate And Store Reset Code 
  const resetCode = randomCode
  user.resetCode = resetCode
  await user.save()

  // Send Email To User 
  mail_option.to = [email]
  mail_option.html = mail_option.html.replace("${randomCode" , resetCode)
  await sendMail(transporter , mail_option)

  return res.status(200).json({status : "success" , data : "Reset Code Sent To Your Email ."})
}

export const  resetPassword = async (req , res , next)=>{
  const {resetPasswordCode} = req.body

  // Get User From DataBase
  let userId = req.session?._id
  console.log(req.session?._id);

  let user = await User.findById(userId)
  console.log(user.resetCode);
  
  if (! user  || (resetPasswordCode !== user.resetCode) )
    return res.status(400).json({status : "fail"  , data : "Code to reset password dosn't match"})

  res.status(200).json({status : "success", data : 'Code To Reset Password Has Matched'})
  
}

export const changeForgetPassword = async(req ,res , next )=>{

  const {newPassword , confirmPassword} = req.body

  let userId = req.session?._id 
  console.log(userId);

  let user = await User.findById(userId)
  console.log(user);

  if(! user ){
    return res.status(404).json({status : "Fail" , data  : "This User Not Found"})
  }

  if (newPassword !== confirmPassword){
    return res.status(400).json({status : "fail" , data : `Passwords Not Match`})
  }

  user.password = newPassword
  user.resetCode = undefined
  await user.save()

  req.session.destroy()
  res.status(200).json({status : "success" , data : "Password Has Been Updated Successfully"})


}



