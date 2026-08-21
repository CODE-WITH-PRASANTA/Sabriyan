const mongoose = require("mongoose");

const honeyProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  tag: { type: String, default: 'Pure & Organic' },
  shortDescription: { type: String },
  price: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 5.0 },
  buttonText: { type: String, default: 'BUY NOW' },
  buttonLink: { type: String },
  benefits: [{ type: String }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  featured: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  showHomepage: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 1 },
  seoTitle: { type: String },
  seoKeywords: { type: String },
  image: { type: String, required: true }, // Main image URL
  galleryImages: [{ type: String }] // Array of extra images
}, { timestamps: true });

module.exports = mongoose.model("HoneyProduct", honeyProductSchema);