const StoreArticle = require("../models/StoreArticle");

// GET /api/store-articles (Fetch list)
const getStoreArticles = async (req, res) => {
  try {
    const articles = await StoreArticle.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/store-articles (Create)
const publishStoreArticle = async (req, res) => {
  try {
    const {
      name,
      slug,
      shortDesc,
      detailedDesc,
      productType,
      regularPrice,
      salePrice,
      costPrice,
      stockQuantity,
      sku,
      lowStockAlert,
      category,
      subCategory,
      brand,
      weight,
      dimensions,
      expiryDate,
      barcode,
      isFeatured,
      isActive,
      allowReviews,
      tags,
      status,
    } = req.body;

    if (!name || !regularPrice || !category || !brand || !shortDesc || !detailedDesc) {
      return res.status(400).json({
        success: false,
        message: "Name, Short Description, Detailed Description, Regular Price, Category, and Brand are required.",
      });
    }

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags = [];
      }
    }

    let parsedExpiryDate = null;
    if (expiryDate && typeof expiryDate === "string" && expiryDate.trim() !== "") {
      const parsed = new Date(expiryDate);
      if (!isNaN(parsed.getTime())) parsedExpiryDate = parsed;
    }

    let uploadedImagePath = "";
    if (req.file) {
      uploadedImagePath = req.file.destinationPath || req.file.path || req.file.filename || "";
    }

    const articlePayload = {
      name: name.trim(),
      shortDesc: shortDesc.trim(),
      detailedDesc: detailedDesc.trim(),
      productType: productType || "Chocolate",
      regularPrice: Number(regularPrice) || 0,
      salePrice: salePrice && !isNaN(Number(salePrice)) ? Number(salePrice) : null,
      costPrice: costPrice && !isNaN(Number(costPrice)) ? Number(costPrice) : null,
      stockQuantity: Number(stockQuantity) || 0,
      lowStockAlert: lowStockAlert && !isNaN(Number(lowStockAlert)) ? Number(lowStockAlert) : 10,
      category: category.trim(),
      subCategory: subCategory ? subCategory.trim() : "",
      brand: brand.trim(),
      tags: parsedTags,
      image: uploadedImagePath,
      weight: weight ? weight.trim() : "",
      dimensions: dimensions ? dimensions.trim() : "",
      expiryDate: parsedExpiryDate,
      barcode: barcode ? barcode.trim() : "",
      isFeatured: isFeatured === "true" || isFeatured === true,
      isActive: isActive === "true" || isActive === true,
      allowReviews: allowReviews === "true" || allowReviews === true,
      status: status || "published",
    };

    if (slug && slug.trim() !== "") articlePayload.slug = slug.trim();
    if (sku && sku.trim() !== "") articlePayload.sku = sku.trim();

    const newArticle = new StoreArticle(articlePayload);
    const savedArticle = await newArticle.save();

    return res.status(201).json({
      success: true,
      message: `Product "${savedArticle.name}" published successfully!`,
      data: savedArticle,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(409).json({
        success: false,
        message: `An article with this ${field} already exists.`,
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/store-articles/:id (Delete)
const deleteStoreArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StoreArticle.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    return res.status(200).json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStoreArticles,
  publishStoreArticle,
  deleteStoreArticle,
};