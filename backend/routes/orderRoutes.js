const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const Order = require('../models/Order'); // Assuming you have an Order model defined


const {placeOrder,getAllOrders,getOrderStats} = require('../controllers/OrderController');



router.post("/",requireAuth,placeOrder);
router.get("/getAllOrders",isAdmin,getAllOrders);
router.get("/getOrderStats",isAdmin,getOrderStats);
router.get("/user-orders", requireAuth, async (req, res) => {
    try {
      console.log("Fetching orders for user:", req.user.id);
      
      const orders = await Order.find({ user: req.user.id })
        .populate('user', 'email name')
        .sort({ createdAt: -1 }); // Sort by newest first
      
      console.log(`Found ${orders.length} orders for user`);
      res.json(orders);
    } catch (err) {
      console.error("Failed to fetch user orders:", err);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

module.exports = router;
