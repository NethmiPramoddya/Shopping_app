import express from 'express'
import { createOrder, getOrder, updateOrder } from '../Controller/orderController.js'

const orderRouter = express.Router()
orderRouter.post("/",createOrder)
orderRouter.get("/:page/:limit",getOrder)
orderRouter.put("/:orderId", updateOrder)

export default orderRouter