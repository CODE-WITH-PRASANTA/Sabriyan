const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: String,
      default: "",
      trim: true,
    },

    featuredImage: {
      type: String,
      required: true,
    },

    thumbnailImage: {
      type: String,
      default: "",
    },

    excerpt: {
      type: String,
      required: true,
      maxlength: 160,
    },

    content: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Draft",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    publishDate: {
      type: Date,
      default: null,
    },

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    metaKeywords: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);