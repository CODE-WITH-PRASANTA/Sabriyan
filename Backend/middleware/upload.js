const multer = require("multer"); // Removed the comment slashes
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file && file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only valid image files (PNG, JPG, JPEG, WEBP) are allowed!"));
    }
  },
});

const convertToWebp = (options = {}) => {
  const { quality = 80, folder = "products", prefix = "product" } = options;

  return async (req, res, next) => {
    try {
      if (!req.file && (!req.files || Object.keys(req.files).length === 0)) {
        return next();
      }

      const targetFolder = folder || "products";
      const targetDir = path.join(__dirname, `../public/uploads/${targetFolder}`);
      await fs.promises.mkdir(targetDir, { recursive: true });

      const processFile = async (fileObj) => {
        if (!fileObj || !fileObj.buffer || fileObj.buffer.length === 0) return;

        const filePrefix = prefix || targetFolder;
        const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const outputPath = path.join(targetDir, uniqueName);

        await sharp(fileObj.buffer)
          .rotate() 
          .webp({ quality: Number(quality) || 80, effort: 4 })
          .toFile(outputPath);

        fileObj.filename = uniqueName;
        fileObj.mimetype = "image/webp";
        fileObj.path = outputPath;
        fileObj.destinationPath = `/uploads/${targetFolder}/${uniqueName}`.replace(/\\/g, "/");
      };

      if (req.file) await processFile(req.file);

      if (req.files && !Array.isArray(req.files) && typeof req.files === "object") {
        for (const fieldName in req.files) {
          const fileArray = req.files[fieldName];
          for (const fileObj of fileArray) {
            await processFile(fileObj);
          }
        }
      } else if (req.files && Array.isArray(req.files)) {
        for (const fileObj of req.files) {
          await processFile(fileObj);
        }
      }

      next();
    } catch (error) {
      console.error("WebP Conversion Middleware Error:", error);
      return res.status(500).json({ success: false, message: `Image processing failed: ${error.message}` });
    }
  };
};

module.exports = { upload, convertToWebp };