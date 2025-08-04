const Product = require('../models/Product');

// @desc Create a new product
exports.createProduct = async (req, res) => {
    try {
      const {
        id,
        title,
        price,
        brand,
        category,
        offer,
        desp,
        images,
        inStockQty,
        sizes,
        colors,
      } = req.body;
  
      if (!images || images.length === 0) {
        return res.status(400).json({ message: "No images provided" });
      }
  
      const newProduct = await Product.create({
        id,
        title,
        price,
        brand,
        category,
        offer,
        desp,
        images, // already an array of image URLs
        inStockQty,
        sizes,
        colors,
      });
  
      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.getProductStats = async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
     
      res.status(200).json(totalProducts);
      
     
    } catch (err) {
      res.status(500).json({ error: "Failed to count products" });
    }
  };

// @desc Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// @desc Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// @desc Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
// @desc Edit a product
exports.editProduct = async (req, res) => {
  try {
    const {
      
      title,
      price,
      brand,
      category,
      offer,
      desp,
      images,
      inStockQty, 
      sizes,
      colors,
    } = req.body;

    // Find the product by ID
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.title = title || product.title;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.offer = offer || product.offer;
    product.desp = desp || product.desp;
    product.images = images && images.length > 0 ? images : product.images;
    product.inStockQty=inStockQty || product.inStockQty 
    product.sizes = sizes && sizes.length > 0 ? sizes : product.sizes;
    product.colors = colors && colors.length > 0 ? colors : product.colors;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};
