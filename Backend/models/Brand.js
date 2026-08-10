const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    description: {
      type: String,
      default: 'No description provided',
    },
    website: {
      type: String,
      default: '',
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
    seoTitle: {
      type: String,
      default: '',
    },
    metaDesc: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 1,
    },
    productsCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=200&auto=format&fit=crop',
    },
  },
  {
    timestamps: true,
  }
);

// ✅ FIXED: Removed `next` parameter and `next()` invocation
brandSchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

module.exports = mongoose.model('Brand', brandSchema);