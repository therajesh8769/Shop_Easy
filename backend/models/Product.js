const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    id:
    {
        type:String,
        required:true,
        unique:true
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
  brand: { type: String },
  category: { type: String },
  offer: { type: String },
  desp: { type: String },
  images: [{ type: String }],// array of image URLs
  inStockQty:Number, 
  sizes: { type: [String], default: [] }, // array of sizes
  colors:{type:[String],default:[]}, // array of colors
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', productSchema);