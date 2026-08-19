const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: 'C' },
  product: { type: String, required: true },
  productImg: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80' 
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  review: { type: String, required: true },
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
  date: { type: String },
  time: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);