const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Store file in memory buffer for Sharp processing
const storage = multer.memoryStorage();

// Multer Upload Configuration
const upload = multer({
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept valid image MIME types
    if (file && file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only valid image files (PNG, JPG, JPEG, WEBP) are allowed!"));
    }
  },
});

// Middleware Factory: Convert Buffer to Optimized WebP
const convertToWebp = (options = {}) => {
  const {
    quality = 80,
    folder = "products",
    prefix = "product",
  } = options;

  return async (req, res, next) => {
    try {
      // 1. If no image was uploaded, skip gracefully
      if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
        return next();
      }

      // 2. Define upload destination directory
      const targetFolder = folder || "products";
      const targetDir = path.join(__dirname, `../public/uploads/${targetFolder}`);

      // 3. Ensure target directory exists asynchronously
      await fs.promises.mkdir(targetDir, { recursive: true });

      // 4. Generate unique, collision-resistant WebP filename
      const filePrefix = prefix || targetFolder;
      const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
      const outputPath = path.join(targetDir, uniqueName);

      // 5. Optimize and convert image with Sharp
      await sharp(req.file.buffer)
        .rotate() // Automatically orient image based on EXIF
        .webp({ quality: Number(quality) || 80, effort: 4 })
        .toFile(outputPath);

      // 6. Attach standardized metadata and URL path to req.file
      req.file.filename = uniqueName;
      req.file.mimetype = "image/webp";
      req.file.path = outputPath;
      // Use standard forward slashes for clean frontend URL resolution
      req.file.destinationPath = `/uploads/${targetFolder}/${uniqueName}`.replace(/\\/g, "/");

      next();
    } catch (error) {
      console.error("❌ WebP Conversion Middleware Error:", error);
      return res.status(500).json({
        success: false,
        message: `Image processing failed: ${error.message}`,
      });
    }
  };
};

module.exports = { upload, convertToWebp };