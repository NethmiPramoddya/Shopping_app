import express from 'express'
import { createOrder } from '../Controller/orderController.js'

const orderRouter = express.Router()
orderRouter.post("/",createOrder)

export default orderRouter