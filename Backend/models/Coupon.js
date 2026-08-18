const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: [true, 'Coupon name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    discountType: {
      type: String,
      enum: ['Percentage (%)', 'Flat (₹)'],
      default: 'Percentage (%)'
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required']
    },
    minOrder: {
      type: Number,
      default: 0
    },
    maxDiscount: {
      type: Number,
      default: null
    },
    validFrom: {
      type: String,
      required: [true, 'Valid from date is required']
    },
    validTo: {
      type: String,
      required: [true, 'Valid to date is required']
    },
    applicableOn: {
      type: String,
      default: 'All Products'
    },
    usageLimit: {
      type: Number,
      default: 100
    },
    perUserLimit: {
      type: Number,
      default: 1
    },
    usageCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Active', 'Scheduled', 'Expired'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);