const PremiumCollection = require("../models/PremiumCollection");
 
// Helper to escape regex special characters
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  
// ================= 1. CREATE PRODUCT (POST) =================
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      shortTitle,
      description,
      rating,
      mrp,
      sellingPrice,
      cocoa,
      weight,
      sweetness,
      status,
      featured,
      trending,
      metaTitle,
      metaKeywords,
      metaDescription,
      displayOrder,
    } = req.body;

    // ProcessUploaded Files
    let mainImageUrl = req.body.image || '';
    let bgImageUrl = req.body.bgImage || '';
    let galleryImageUrls = [];

    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        mainImageUrl = `/uploads/products/${req.files.image[0].filename}`;
      }
      if (req.files.bgImage && req.files.bgImage[0]) {
        bgImageUrl = `/uploads/products/${req.files.bgImage[0].filename}`;
      }
      if (req.files.galleryImages) {
        galleryImageUrls = req.files.galleryImages.map(
          (file) => `/uploads/products/${file.filename}`
        );
      }
    }

    if (!mainImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Main product image is required',
      });
    }

    const mrpNum = Number(mrp) || 0;
    const sellingPriceNum = Number(sellingPrice) || 0;
    const discountNum = mrpNum > 0 ? Math.round(((mrpNum - sellingPriceNum) / mrpNum) * 100) : 0;

    const newProduct = new PremiumCollection({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      category: category || 'Premium Collection',
      shortTitle,
      description,
      rating: Number(rating) || 5,
      mrp: mrpNum,
      sellingPrice: sellingPriceNum,
      discount: discountNum,
      cocoa: cocoa || '0',
      weight: weight || '',
      sweetness: sweetness || 'Medium',
      status: status || 'Active',
      featured: featured === 'Yes' || featured === true || featured === 'true',
      trending: trending === 'Yes' || trending === true || trending === 'true',
      metaTitle,
      metaKeywords,
      metaDescription,
      displayOrder: Number(displayOrder) || 1,
      image: mainImageUrl,
      bgImage: bgImageUrl,
      galleryImages: galleryImageUrls.length > 0 ? galleryImageUrls : [mainImageUrl],
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create product',
    });
  }
};

// ================= 2. GET ALL PRODUCTS (GET) =================
exports.getProducts = async (req, res) => {
  try {
    const { search, category, status, featured, rating, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search
    if (search && String(search).trim() !== '') {
      const sanitized = escapeRegex(String(search).trim());
      query.$or = [
        { name: { $regex: sanitized, $options: 'i' } },
        { shortTitle: { $regex: sanitized, $options: 'i' } },
      ];
    }

    // Category
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    // Status
    if (status && status !== 'All Status') {
      query.status = status;
    }

    // Featured
    if (featured && featured !== 'All') {
      query.featured = featured === 'Featured' || featured === 'Yes' || featured === 'true';
    }

    // Rating
    if (rating && rating !== 'All Ratings') {
      query.rating = { $gte: Number(rating) };
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await PremiumCollection.countDocuments(query);
    const products = await PremiumCollection.find(query)
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
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching products',
    });
  }
};

// ================= 3. GET SINGLE PRODUCT BY ID =================
exports.getProductById = async (req, res) => {
  try {
    const product = await PremiumCollection.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ================= 4. UPDATE PRODUCT (PUT) =================
exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.mrp || updates.sellingPrice) {
      const mrpNum = Number(updates.mrp) || 0;
      const sellingPriceNum = Number(updates.sellingPrice) || 0;
      updates.discount = mrpNum > 0 ? Math.round(((mrpNum - sellingPriceNum) / mrpNum) * 100) : 0;
    }

    if (updates.featured !== undefined) {
      updates.featured = updates.featured === 'Yes' || updates.featured === true || updates.featured === 'true';
    }

    if (updates.trending !== undefined) {
      updates.trending = updates.trending === 'Yes' || updates.trending === true || updates.trending === 'true';
    }

    // Process new images if uploaded
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        updates.image = `/uploads/products/${req.files.image[0].filename}`;
      }
      if (req.files.bgImage && req.files.bgImage[0]) {
        updates.bgImage = `/uploads/products/${req.files.bgImage[0].filename}`;
      }
      if (req.files.galleryImages && req.files.galleryImages.length > 0) {
        updates.galleryImages = req.files.galleryImages.map(
          (file) => `/uploads/products/${file.filename}`
        );
      }
    }

    const updatedProduct = await PremiumCollection.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ success: false, message: error.message || 'Update failed' });
  }
};

// ================= 5. DELETE PRODUCT (DELETE) =================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await PremiumCollection.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Delete failed' });
  }
};