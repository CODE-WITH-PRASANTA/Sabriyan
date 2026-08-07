const Product = require("../models/ProductModel");

// @desc    Get all products (supports search, brand/category filters, sorting)
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, brand, category, sort, status } = req.query;
    let query = {};

    // Search filter (by name or SKU)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    // Filters
    if (brand && brand !== 'All') query.brand = brand;
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;

    // Sorting logic
    let sortOptions = { createdAt: -1 }; // Default Newest First
    if (sort === 'Price Low-High') {
      sortOptions = { price: 1 };
    } else if (sort === 'Price High-Low') {
      sortOptions = { price: -1 };
    } else if (sort === 'Oldest First') {
      sortOptions = { createdAt: 1 };
    }

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, sku, desc, brand, category, price, stock, image, status } = req.body;

    if (!name || !sku || !price) {
      return res.status(400).json({ success: false, message: 'Please provide name, SKU, and price' });
    }

    // Assign dynamic emojis based on brand if icon/image isn't explicitly provided
    let defaultImage = image;
    if (!defaultImage) {
      defaultImage = brand === 'Honey' ? '🍯' : brand === 'Combo' ? '🎁' : '🍫';
    }

    const newProduct = new Product({
      image: defaultImage,
      name,
      sku,
      desc: desc || 'Fresh product listing',
      brand: brand || 'Chocolate',
      category: category || 'Dark Chocolate',
      price: Number(price),
      stock: Number(stock) || 0,
      status: status || 'Active',
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'SKU must be unique. This SKU already exists.' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product details
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, sku, desc, brand, category, price, stock, status, image } = req.body;

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.name = name !== undefined ? name : product.name;
    product.sku = sku !== undefined ? sku : product.sku;
    product.desc = desc !== undefined ? desc : product.desc;
    product.brand = brand !== undefined ? brand : product.brand;
    product.category = category !== undefined ? category : product.category;
    product.price = price !== undefined ? Number(price) : product.price;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    product.status = status !== undefined ? status : product.status;
    product.image = image !== undefined ? image : product.image;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};