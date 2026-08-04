const mongoose = require('mongoose');

const premiumCollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Premium Collection',
      trim: true,
    },
    shortTitle: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    mrp: {
      type: Number,
      required: [true, 'MRP is required'],
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Selling Price is required'],
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    cocoa: {
      type: String,
      default: '0',
    },
    weight: {
      type: String,
      default: '',
    },
    sweetness: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    featured: {
      type: Boolean,
      default: true,
    },
    trending: {
      type: Boolean,
      default: true,
    },
    metaTitle: {
      type: String,
      default: '',
    },
    metaKeywords: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      required: [true, 'Main product image is required'],
    },
    bgImage: {
      type: String,
      default: '',
    },
    galleryImages: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PremiumCollection', premiumCollectionSchema);