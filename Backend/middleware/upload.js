const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Memory Storage to hold buffers for Sharp processing
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

/**
 * Middleware to convert memory buffers to WebP and save to disk
 * @param {Object} options - Quality, custom target folder, or custom prefix
 */
const convertToWebp = (options = { quality: 80, folder: "honey", prefix: "img" }) => {
  return async (req, res, next) => {
    try {
      // Dynamic target directory based on passed folder name
      const targetFolder = options.folder || "honey";
      const targetDir = path.join(__dirname, `../public/uploads/${targetFolder}`);

      // Ensure directory exists dynamically
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const saveFileToDisk = async (file) => {
        const filePrefix = options.prefix || targetFolder;
        const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const outputPath = path.join(targetDir, uniqueName);

        // Convert memory buffer and save directly to disk
        await sharp(file.buffer)
          .webp({ quality: options.quality || 80 })
          .toFile(outputPath);

        // Assign filename and paths so controllers can read them
        file.filename = uniqueName;
        file.mimetype = "image/webp";
        file.destinationPath = `/uploads/${targetFolder}/${uniqueName}`;
      };

      // Process single file
      if (req.file) {
        await saveFileToDisk(req.file);
      }

      // Process array of files
      if (Array.isArray(req.files) && req.files.length > 0) {
        await Promise.all(req.files.map((file) => saveFileToDisk(file)));
      }

      // Process named fields (e.g. image & galleryImages)
      if (req.files && !Array.isArray(req.files) && typeof req.files === "object") {
        for (const fieldName of Object.keys(req.files)) {
          await Promise.all(
            req.files[fieldName].map((file) => saveFileToDisk(file))
          );
        }
      }

      next();
    } catch (error) {
      console.error("WebP Conversion Error:", error);
      next(error);
    }
  };
};

module.exports = { upload, convertToWebp };