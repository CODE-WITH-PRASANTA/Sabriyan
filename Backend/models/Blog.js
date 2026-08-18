const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: 100
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    tags: {
      type: String,
      default: ''
    },
    featuredImage: {
      type: String,
      default: ''
    },
    thumbnailImage: {
      type: String,
      default: ''
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt / Short description is required'],
      maxlength: 160
    },
    content: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: 'Admin User'
    },
    authorAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    },
    readTime: {
      type: String,
      default: '5 min read'
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Published'
    },
    featured: {
      type: Boolean,
      default: false
    },
    publishDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    metaTitle: {
      type: String,
      default: ''
    },
    metaDescription: {
      type: String,
      default: ''
    },
    metaKeywords: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Backward-compatibility alias for id and description
blogSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
blogSchema.virtual('description').get(function () {
  return this.excerpt;
});

module.exports = mongoose.model('Blog', blogSchema);