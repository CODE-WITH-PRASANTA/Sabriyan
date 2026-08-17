const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    group: {
      type: String,
      enum: ['Regular', 'VIP Customers'],
      default: 'Regular',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    vip: {
      type: Boolean,
      default: false,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    lastOrder: {
      type: String,
      default: 'New',
    },
    dob: {
      type: String,
      default: 'Not Provided',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    address: {
      type: String,
      default: 'Not Provided',
    },
    rewards: {
      type: Number,
      default: 0,
    },
    category: {
      type: [String],
      default: ['General'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', customerSchema);