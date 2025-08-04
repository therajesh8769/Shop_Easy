const express= require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const crypto = require("crypto");
const {createOrder} = require('../controllers/paymentController');
const dotenv = require('dotenv');
 dotenv.config();
 const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
const Order = require('../models/Order');

// Create a new order
router.post('/create-Order', requireAuth, createOrder);


//verify payment


router.post("/verify-payment", requireAuth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, address,totalAmount } = req.body;
 
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing required payment details" });
  }
  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    // ✅ Save the order to DB
    // const newOrder = new Order({
    //   user: req.user._id,
    //   products: cart,
    //   address: address,
     
    //   status: "Paid",
    // });
     const newOrder = new Order({
          user: req.user.id,
          cartItems,
          totalAmount,
         
          address,
          paymentId: razorpay_payment_id,
        });
        console.log(newOrder);

    await newOrder.save();
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});



module.exports = router;
