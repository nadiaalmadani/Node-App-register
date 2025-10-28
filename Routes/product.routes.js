import express from 'express'
import {createProduct, deleteProduct, getAllProducts, getProductById, updateProduct} from '../Controllers/product.controller.js'
import { authentication, restrictTo } from '../Middlewares/auth.middleware.js'
import imageUpload from '../Middlewares/uploadImage.js'


let productRouter = express.Router()

productRouter.route('/').get(getAllProducts)
productRouter.route('/:id').get(getProductById)

productRouter.use(authentication)
productRouter.route('/create-product').post( imageUpload.single('image') , createProduct)
productRouter.route('/:id').delete(restrictTo('admin') , deleteProduct).patch(imageUpload.single('image') , updateProduct)


export default productRouter