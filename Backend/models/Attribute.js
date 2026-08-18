const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Attribute name is required'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Select', 'Text', 'Color', ''],
      default: 'Select',
    },
    inputType: {
      type: String,
      enum: ['Dropdown', 'Radio', 'Checkbox', ''],
      default: 'Dropdown',
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
      default: 'Product attribute description',
    },
    displayOrder: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    addValuesManually: {
      type: Boolean,
      default: true,
    },
    values: {
      type: [String],
      default: [],
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

// Pre-save hook: Auto-generate slug if not provided (Mongoose v6/v7/v8 safe)
attributeSchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

module.exports = mongoose.model('Attribute', attributeSchema);