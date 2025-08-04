const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        price: Number,
        size:String,
        color: String,
        quantity: Number,
        image: String,
      },
    ],
    totalAmount: Number,
    address: {
      name: String,
      phone: String,
      pincode: String,
      locality: String,
      city: String,
      state: String,
      address: String,
    },
    paymentId:String,
   
    status: {
      type: String,
      enum: ["Order-Placed","Packed", "Shipped","out for delivery", "Delivered"],
      default: "Order-Placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
