const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const Order = require('../models/Order'); // Assuming you have an Order model defined


router.put("/:id/update-status", isAdmin, async (req, res) => {
    
    
    const { status } = req.body;
    
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      console.log("Order updated successfully");
      res.json(updatedOrder);
    } catch (err) {
      console.error("Failed to update status:", err); // Added error logging
      res.status(500).json({ message: "Failed to update status", error: err.message });
    }
  });
module.exports = router;