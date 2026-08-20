const express = require("express");

const {
  getWebsiteSettings,
  createOrUpdateWebsiteSettings,
} = require("../controllers/websiteSettingController");

const {
  upload,
  convertToWebp,
} = require("../middleware/upload");

const router = express.Router();

// =====================================================
// GET WEBSITE SETTINGS
// =====================================================

router.get(
  "/",
  getWebsiteSettings
);

// =====================================================
// CREATE / UPDATE WEBSITE SETTINGS
// =====================================================

router.put(
  "/",
  upload.single("logo"),

  convertToWebp({
    folder: "website",
    prefix: "logo",
    quality: 85,
    resize: true,
    width: 1000,
    height: 1000,
    effort: 4,
  }),

  createOrUpdateWebsiteSettings
);

module.exports = router;