const express = require("express");
const router = express.Router();
const {
  getStoreArticles,
  publishStoreArticle,
  deleteStoreArticle,
} = require("../controllers/storeArticleController");
const { upload, convertToWebp } = require("../middleware/upload");

const safeUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
};

// 1. GET ALL PRODUCTS (Resolves the 404 error)
router.get("/", getStoreArticles);

// 2. CREATE PRODUCT
router.post(
  "/",
  safeUpload,
  convertToWebp({ quality: 80, folder: "articles", prefix: "article" }),
  publishStoreArticle
);

// 3. DELETE PRODUCT
router.delete("/:id", deleteStoreArticle);

module.exports = router;