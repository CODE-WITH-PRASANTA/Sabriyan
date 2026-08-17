const Category = require("../models/Category");

// Helper to escape regex search queries
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// ================= 1. CREATE CATEGORY (POST) =================
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, displayOrder, status } = req.body;

    let imageUrl = req.body.image || '';
    if (req.file) {
      imageUrl = req.file.destinationPath || req.file.path || `/uploads/categories/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Category image is required',
      });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/\s+/g, '-');

    // Check for duplicate name or slug
    const existing = await Category.findOne({
      $or: [{ name: name.trim() }, { slug: generatedSlug }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A category with this name or slug already exists',
      });
    }

    const newCategory = new Category({
      name: name.trim(),
      slug: generatedSlug,
      description: description || '',
      displayOrder: Number(displayOrder) || 0,
      status: status || 'Active',
      image: imageUrl,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create category',
    });
  }
};

// ================= 2. GET ALL CATEGORIES (GET) =================
exports.getCategories = async (req, res) => {
  try {
    const { search, status, sort = 'Newest', page = 1, limit = 10 } = req.query;
    const query = {};

    // Search filter
    if (search && String(search).trim() !== '') {
      const sanitized = escapeRegex(String(search).trim());
      query.$or = [
        { name: { $regex: sanitized, $options: 'i' } },
        { description: { $regex: sanitized, $options: 'i' } },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Sort order
    const sortOrder = sort === 'Oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Category.countDocuments(query);
    const categories = await Category.find(query)
      .sort(sortOrder)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: categories.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching categories',
    });
  }
};

// ================= 3. GET CATEGORY BY ID =================
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ================= 4. UPDATE CATEGORY (PUT) =================
exports.updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.destinationPath || req.file.path || `/uploads/categories/${req.file.filename}`;
    }

    if (updates.displayOrder !== undefined) {
      updates.displayOrder = Number(updates.displayOrder);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update category',
    });
  }
};

// ================= 5. DELETE CATEGORY (DELETE) =================
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to delete category' });
  }
};