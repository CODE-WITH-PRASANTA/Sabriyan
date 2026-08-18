const Testimonial = require("../models/Testimonial");
const mongoose = require('mongoose');

// Helper to escape regex search query
const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

// ================= CREATE TESTIMONIAL =================
exports.createTestimonial = async (req, res) => {
  try {
    const {
      customerName,
      designation,
      review,
      rating,
      status,
      displayOrder,
      featured,
    } = req.body;

    let imageUrl = req.body.image || '';
    if (req.file) {
      imageUrl = `/uploads/testimonials/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Customer image is required',
      });
    }

    const newTestimonial = new Testimonial({
      customerName,
      designation: designation || '',
      image: imageUrl,
      review,
      rating: Number(rating) || 5,
      status: status || 'Active',
      displayOrder: Number(displayOrder) || 1,
      featured: featured === 'true' || featured === true,
    });

    const savedTestimonial = await newTestimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: savedTestimonial,
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create testimonial',
    });
  }
};

// ================= GET ALL TESTIMONIALS =================
exports.getTestimonials = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search filter
    if (search && String(search).trim() !== '') {
      const sanitizedSearch = escapeRegex(String(search).trim());
      query.$or = [
        { customerName: { $regex: sanitizedSearch, $options: 'i' } },
        { designation: { $regex: sanitizedSearch, $options: 'i' } },
        { review: { $regex: sanitizedSearch, $options: 'i' } },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Testimonial.countDocuments(query);

    const testimonials = await Testimonial.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: testimonials.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: testimonials,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching testimonials',
    });
  }
};

// ================= GET SINGLE TESTIMONIAL =================
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Error fetching testimonial by ID:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ================= UPDATE TESTIMONIAL =================
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    const updates = { ...req.body };

    if (updates.rating !== undefined) updates.rating = Number(updates.rating);
    if (updates.displayOrder !== undefined) updates.displayOrder = Number(updates.displayOrder);
    if (updates.featured !== undefined) {
      updates.featured = updates.featured === 'true' || updates.featured === true;
    }

    if (req.file) {
      updates.image = `/uploads/testimonials/${req.file.filename}`;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update testimonial',
    });
  }
};

// ================= DELETE TESTIMONIAL =================
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete testimonial',
    });
  }
};