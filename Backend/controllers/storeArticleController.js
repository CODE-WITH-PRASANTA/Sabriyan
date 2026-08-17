const StoreArticle = require("../models/StoreArticle");

const publishStoreArticle = async (req, res) => {
  try {
    console.log("--- New Request Received ---");
    console.log("Incoming Body:", req.body);
    console.log("Incoming File:", req.file ? "File Received" : "No File");

    const {
      name, slug, shortDesc, detailedDesc, productType, regularPrice,
      salePrice, costPrice, stockQuantity, sku, lowStockAlert,
      category, subCategory, brand, weight, dimensions,
      expiryDate, barcode, isFeatured, isActive, allowReviews, tags, status,
    } = req.body;

    // Strict check before hitting DB
    if (!name || !regularPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "Name, Regular Price, Category, and Brand are required fields.",
      });
    }

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (err) {
        parsedTags = [];
      }
    }

    // Default to empty string if no image was uploaded
    const uploadedImagePath = req.file && req.file.destinationPath ? req.file.destinationPath : "";

    const newArticle = new StoreArticle({
      name,
      slug: slug || undefined,
      shortDesc,
      detailedDesc,
      productType: productType || "Chocolate",
      regularPrice: Number(regularPrice) || 0,
      salePrice: salePrice ? Number(salePrice) : null,
      costPrice: costPrice ? Number(costPrice) : null,
      stockQuantity: Number(stockQuantity) || 0,
      sku: sku || undefined,
      lowStockAlert: lowStockAlert ? Number(lowStockAlert) : 10,
      category,
      subCategory: subCategory || "",
      brand,
      tags: parsedTags,
      image: uploadedImagePath,
      weight: weight || "",
      dimensions: dimensions || "",
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      barcode: barcode || "",
      isFeatured: isFeatured === "true" || isFeatured === true,
      isActive: isActive === "true" || isActive === true,
      allowReviews: allowReviews === "true" || allowReviews === true,
      status: status || "published",
    });

    const savedArticle = await newArticle.save();

    console.log("✅ Product successfully saved to DB!");

    return res.status(201).json({
      success: true,
      message: `Article "${savedArticle.name}" published successfully!`,
      data: savedArticle,
    });
  } catch (error) {
    console.error("❌ Mongoose Save Error:", error.message);
    
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "An article with this name/slug already exists." });
    }
    
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { publishStoreArticle };