import express from 'express';
import Product from '../models/product.js';
import Order from '../models/order.js';
import User from '../models/user.js';


const dashboardRouter = express.Router();

// GET /api/dashboard/summary
dashboardRouter.get("/summary", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({ totalProducts, totalOrders, totalUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default dashboardRouter
