const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: '🍫', // Matches the emojis or can handle image URLs/paths if upgraded later
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    desc: {
      type: String,
      default: 'Fresh product listing',
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      enum: ['Chocolate', 'Honey', 'Combo'],
      default: 'Chocolate',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);