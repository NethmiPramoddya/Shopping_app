import express from 'express'
import { createOrder, getOrder } from '../Controller/orderController.js'

const orderRouter = express.Router()
orderRouter.post("/",createOrder)
orderRouter.get("/:page/:limit",getOrder)

export default orderRouter