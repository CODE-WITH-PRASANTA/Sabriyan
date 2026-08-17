const mongoose = require('mongoose');

const articleTagSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    color: { type: String, default: 'blue' },
  },
  { _id: false }
);

const storeArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Article name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDesc: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [160, 'Short description cannot exceed 160 characters'],
      trim: true,
    },
    detailedDesc: {
      type: String,
      required: [true, 'Detailed description is required'],
    },
    productType: {
      type: String,
      required: true,
      enum: ['Chocolate', 'Honey', 'Combo', 'Other'],
      default: 'Chocolate',
    },
    regularPrice: {
      type: Number,
      required: [true, 'Regular price is required'],
      min: [0, 'Regular price cannot be negative'],
    },
    salePrice: {
      type: Number,
      default: null,
      min: [0, 'Sale price cannot be negative'],
    },
    costPrice: {
      type: Number,
      default: null,
      min: [0, 'Cost price cannot be negative'],
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    sku: {
      type: String,
      trim: true,
      sparse: true,
    },
    lowStockAlert: {
      type: Number,
      default: 10,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
      default: '',
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    tags: [articleTagSchema],
    image: {
      type: String,
      default: '',
    },
    weight: {
      type: String,
      trim: true,
      default: '',
    },
    dimensions: {
      type: String,
      trim: true,
      default: '',
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    barcode: {
      type: String,
      trim: true,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    allowReviews: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate URL-safe slug before saving if not supplied
storeArticleSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('StoreArticle', storeArticleSchema);