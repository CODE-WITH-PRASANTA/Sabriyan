const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

const convertToWebp = (options = { quality: 80, folder: "products", prefix: "product" }) => {
  return async (req, res, next) => {
    try {
      // PREVENT SERVER CRASH: If no file uploaded, skip to the next step
      if (!req.file) {
        return next(); 
      }

      const targetFolder = options.folder || "products";
      const targetDir = path.join(__dirname, `../public/uploads/${targetFolder}`);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const filePrefix = options.prefix || targetFolder;
      const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
      const outputPath = path.join(targetDir, uniqueName);

      await sharp(req.file.buffer)
        .webp({ quality: options.quality || 80 })
        .toFile(outputPath);

      req.file.filename = uniqueName;
      req.file.mimetype = "image/webp";
      req.file.destinationPath = `/uploads/${targetFolder}/${uniqueName}`;

      next();
    } catch (error) {
      console.error("WebP Conversion Error:", error);
      res.status(500).json({ success: false, message: "Failed to process image." });
    }
  };
};

module.exports = { upload, convertToWebp };