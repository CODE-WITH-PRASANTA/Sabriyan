const mongoose = require('mongoose');

const honeyProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    tag: {
      type: String,
      default: 'Pure & Organic',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },
    buttonText: {
      type: String,
      default: 'BUY NOW',
    },
    buttonLink: {
      type: String,
      default: '',
    },
    benefits: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    showHomepage: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 1,
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoKeywords: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Main product image is required'],
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

module.exports = mongoose.model('HoneyProduct', honeyProductSchema);