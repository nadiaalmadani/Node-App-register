import express from 'express'
import {changeForgetPassword, forgetPassword, login, register, resetPassword} from '../Controllers/user.controller.js'
import {loginVerify, registerVerify} from '../Middlewares/auth.validation.js'
const userRouter = express.Router()

userRouter.route('/register').post( registerVerify ,register)
userRouter.route('/login').post(loginVerify , login)
userRouter.route('/forget-password').post(forgetPassword)
userRouter.route('/reset-password').post(resetPassword)
userRouter.route('/change-password').post(changeForgetPassword)

export default userRouter