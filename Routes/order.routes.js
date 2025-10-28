import express from "express";
import {
    createOrder,
    deleteOrderById,
    getAllOrders,
    getOrderById,
    updateOrder,
} from "../Controllers/order.controller.js";
import { authentication, restrictTo } from "../Middlewares/auth.middleware.js";

let orderRouter = express.Router();

orderRouter.route("/").get(getAllOrders);
orderRouter.route("/orderId").get(getOrderById);

// Must Login First
orderRouter.use(authentication);
orderRouter.route("/:productId").post(createOrder);
orderRouter
    .route("/:orderId")
    .patch(updateOrder)
    .delete(restrictTo("admin"), deleteOrderById);

export default orderRouter;
