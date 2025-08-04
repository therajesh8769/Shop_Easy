const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, address } = req.body;

    if (!cartItems?.length || !address) {
      return res.status(400).json({ error: "Missing required data." });
    }
console.log(cartItems);
    const newOrder = new Order({
      user: req.user.id,
      cartItems,
      totalAmount,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
},
exports.getAllOrders = async (req, res) => {
    try {
        
        const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
        res.status(200).json(orders);
        console.log(orders.cartItems);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
    }
    exports.getOrderStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
       
        res.status(200).json(totalOrders);
    } catch (err) {
        console.error("Error counting orders:", err);
        res.status(500).json({ error: "Failed to count orders" });
    }
}   
