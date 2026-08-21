const multer = require("multer"); // Removed the comment slashes
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (
      file &&
      file.mimetype &&
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files are allowed!"
        )
      );
    }
  },
});

const convertToWebp = (options = {}) => {
  const {
    quality = 80,
    folder = "blogs",
    prefix = "blog",
    width,
    height,
  } = options;

  return async (req, res, next) => {
    try {
      if (!req.files) {
        return next();
      }

      const targetFolder = folder || "blogs";

      const targetDir = path.join(
        __dirname,
        `../public/uploads/${targetFolder}`
      );

      await fs.promises.mkdir(targetDir, {
        recursive: true,
      });

      const processImage = async (file, filePrefix) => {
        if (!file || !file.buffer) {
          return null;
        }

        const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}.webp`;

        const outputPath = path.join(
          targetDir,
          uniqueName
        );

        let image = sharp(file.buffer).rotate();

        if (width || height) {
          image = image.resize(width, height, {
            fit: "cover",
            withoutEnlargement: true,
          });
        }

        await image
          .webp({
            quality: Number(quality) || 80,
            effort: 4,
          })
          .toFile(outputPath);

        return {
          originalname: file.originalname,
          filename: uniqueName,
          mimetype: "image/webp",
          path: outputPath,
          url: `/uploads/${targetFolder}/${uniqueName}`,
        };
      };

      if (req.files.featuredImage) {
        req.files.featuredImage = await Promise.all(
          req.files.featuredImage.map((file) =>
            processImage(file, `${prefix}-featured`)
          )
        );
      }

      if (req.files.thumbnailImage) {
        req.files.thumbnailImage = await Promise.all(
          req.files.thumbnailImage.map((file) =>
            processImage(file, `${prefix}-thumbnail`)
          )
        );
      }

      next();
    } catch (error) {
      console.error(
        "❌ WebP Conversion Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: `Image processing failed: ${error.message}`,
      });
    }
  };
};

module.exports = {
  upload,
  convertToWebp,
};