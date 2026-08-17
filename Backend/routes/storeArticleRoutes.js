const express = require("express");
const router = express.Router();
const { publishStoreArticle } = require("../controllers/storeArticleController");
const { upload, convertToWebp } = require("../middleware/upload");

// Wrapper to prevent Multer from silently crashing the server
const safeUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
};

router.post(
  "/",
  safeUpload,
  convertToWebp({ quality: 80, folder: "articles", prefix: "article" }),
  publishStoreArticle
);

module.exports = router;