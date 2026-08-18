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

// Middleware Factory: Convert Buffer(s) to Optimized WebP
const convertToWebp = (options = {}) => {
  const {
    quality = 80,
    folder = "blogs",
    prefix = "blog",
  } = options;

  return async (req, res, next) => {
    try {
      // Helper function to process a single file object
      const processFile = async (fileObj, filePrefix) => {
        if (!fileObj || !fileObj.buffer || fileObj.buffer.length === 0) return;

        const targetFolder = folder || "blogs";
        const targetDir = path.join(__dirname, `../public/uploads/${targetFolder}`);

        // Ensure target directory exists asynchronously
        await fs.promises.mkdir(targetDir, { recursive: true });

        // Generate unique, collision-resistant WebP filename
        const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const outputPath = path.join(targetDir, uniqueName);

        // Optimize and convert image with Sharp
        await sharp(fileObj.buffer)
          .rotate() // Automatically orient image based on EXIF
          .webp({ quality: Number(quality) || 80, effort: 4 })
          .toFile(outputPath);

        // Attach standardized metadata and URL path to file object
        fileObj.filename = uniqueName;
        fileObj.mimetype = "image/webp";
        fileObj.path = outputPath;
        fileObj.destinationPath = `/uploads/${targetFolder}/${uniqueName}`.replace(/\\/g, "/");
      };

      // 1. Handle single uploaded file (`req.file`)
      if (req.file) {
        await processFile(req.file, prefix);
      }

      // 2. Handle multiple uploaded files / fields (`req.files` as an object of arrays, e.g., multer.fields)
      if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
        for (const fieldName of Object.keys(req.files)) {
          for (let i = 0; i < req.files[fieldName].length; i++) {
            await processFile(req.files[fieldName][i], `${prefix}-${fieldName}`);
          }
        }
      }

      // 3. Handle multiple uploaded files (`req.files` as an array, e.g., multer.array)
      if (Array.isArray(req.files)) {
        for (let i = 0; i < req.files.length; i++) {
          await processFile(req.files[i], prefix);
        }
      }

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