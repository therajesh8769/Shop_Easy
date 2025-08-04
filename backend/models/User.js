const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    name: String,
    phone: String,
    pincode: String,
    locality: String,
    city: String,
    state: String,
    address: String,
    isDefault: { type: Boolean, default: false }
  });
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, // normal users won't be admin
      },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    addresses: [addressSchema], // array of addresses
    });
const User = mongoose.model('User', userSchema);
module.exports = User;