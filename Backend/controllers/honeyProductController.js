const HoneyProduct = require("../models/HoneyProduct");
const mongoose = require("mongoose");

// Helper to handle array or JSON-string formatted benefits
const parseBenefits = (benefits) => {
  if (!benefits) return [];
  if (Array.isArray(benefits)) return benefits;
  try {
    return JSON.parse(benefits);
  } catch (err) {
    return String(benefits).split(',').map((b) => b.trim()).filter(Boolean);
  }
};

// Helper to safely escape regex search strings
const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// ================= CREATE HONEY PRODUCT =================
exports.createHoneyProduct = async (req, res) => {
  try {
    const {
      name, slug, category, tag, shortDescription, price, rating,
      buttonText, buttonLink, benefits, status, featured, bestSeller,
      showHomepage, displayOrder, seoTitle, seoKeywords,
    } = req.body;

    let mainImageUrl = req.body.image || '';
    if (req.files && req.files['image'] && req.files['image'][0]) {
      mainImageUrl = `/uploads/honey/${req.files['image'][0].filename}`;
    }

    let galleryImageUrls = [];
    if (req.files && req.files['galleryImages']) {
      galleryImageUrls = req.files['galleryImages'].map(
        (file) => `/uploads/honey/${file.filename}`
      );
    }

    const generatedSlug = (slug || name || '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');

    const newProduct = new HoneyProduct({
      name,
      slug: generatedSlug,
      category,
      tag: tag || 'Pure & Organic',
      shortDescription,
      price: Number(price) || 0,
      rating: Number(rating) || 5.0,
      buttonText: buttonText || 'BUY NOW',
      buttonLink: buttonLink || '',
      benefits: parseBenefits(benefits),
      status: status || 'Active',
      featured: featured === 'true' || featured === true,
      bestSeller: bestSeller === 'true' || bestSeller === true,
      showHomepage: showHomepage === 'true' || showHomepage === true,
      displayOrder: Number(displayOrder) || 1,
      seoTitle: seoTitle || '',
      seoKeywords: seoKeywords || '',
      image: mainImageUrl,
      galleryImages: galleryImageUrls,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Honey product created successfully',
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating honey product:", error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create honey product',
    });
  }
};

// ================= GET ALL HONEY PRODUCTS =================
exports.getHoneyProducts = async (req, res) => {
  try {
    const { search, category, status, minRating, featured, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search filter
    if (search && String(search).trim() !== '') {
      const sanitizedSearch = escapeRegex(String(search).trim());
      query.$or = [
        { name: { $regex: sanitizedSearch, $options: 'i' } },
        { tag: { $regex: sanitizedSearch, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'All Categories' && category !== 'All') {
      query.category = category;
    }

    // Status filter
    if (status && status !== 'All Status' && status !== 'All') {
      query.status = status;
    }

    // Rating filter
    if (minRating && minRating !== 'All Ratings' && !isNaN(Number(minRating))) {
      query.rating = { $gte: Number(minRating) };
    }

    // Featured filter
    if (featured === 'Featured' || featured === 'true' || featured === true) {
      query.featured = true;
    } else if (featured === 'Non-Featured' || featured === 'false' || featured === false) {
      query.featured = false;
    }

    // Safe pagination values
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await HoneyProduct.countDocuments(query);

    const products = await HoneyProduct.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: products,
    });
  } catch (error) {
    console.error("Error in getHoneyProducts:", error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching honey products',
    });
  }
};

// ================= GET SINGLE HONEY PRODUCT =================
exports.getHoneyProductById = async (req, res) => {
  try {
    // Read parameter directly using req.params.id matching router.route('/:id')
    const paramId = req.params.id;

    if (!paramId) {
      return res.status(400).json({ success: false, message: 'Product ID or slug is required' });
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(paramId);

    const product = isObjectId
      ? await HoneyProduct.findById(paramId)
      : await HoneyProduct.findOne({ slug: paramId });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in getHoneyProductById:", error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ================= UPDATE HONEY PRODUCT =================
exports.updateHoneyProduct = async (req, res) => {
  try {
    const product = await HoneyProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updates = { ...req.body };

    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.rating !== undefined) updates.rating = Number(updates.rating);
    if (updates.displayOrder !== undefined) updates.displayOrder = Number(updates.displayOrder);
    if (updates.benefits !== undefined) updates.benefits = parseBenefits(updates.benefits);

    if (updates.featured !== undefined) updates.featured = updates.featured === 'true' || updates.featured === true;
    if (updates.bestSeller !== undefined) updates.bestSeller = updates.bestSeller === 'true' || updates.bestSeller === true;
    if (updates.showHomepage !== undefined) updates.showHomepage = updates.showHomepage === 'true' || updates.showHomepage === true;

    if (req.files && req.files['image'] && req.files['image'][0]) {
      updates.image = `/uploads/honey/${req.files['image'][0].filename}`;
    }

    if (req.files && req.files['galleryImages']) {
      const newGallery = req.files['galleryImages'].map(
        (file) => `/uploads/honey/${file.filename}`
      );
      updates.galleryImages = [...(product.galleryImages || []), ...newGallery];
    }

    const updatedProduct = await HoneyProduct.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update product' });
  }
};

// ================= DELETE HONEY PRODUCT =================
exports.deleteHoneyProduct = async (req, res) => {
  try {
    const product = await HoneyProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Honey product deleted successfully',
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete product' });
  }
};