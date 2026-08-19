const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    unit: { type: String, default: 'pcs' },
    stock: { type: Number, required: true, default: 0 },
    lowStock: { type: Number, required: true, default: 0 },
    cost: { type: String, required: true },
    expiry: { type: String, default: '' },
    supplier: { type: String, default: '' },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['In Stock', 'Low Stock'], default: 'In Stock' },
    img: {
      type: String,
      default: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=60'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);