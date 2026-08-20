const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// =====================================================
// MULTER MEMORY STORAGE
// =====================================================

const storage = multer.memoryStorage();

// =====================================================
// ALLOWED IMAGE TYPES
// =====================================================

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/bmp",
  "image/tiff",
];

// =====================================================
// MULTER UPLOAD
// =====================================================

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (
      file &&
      file.mimetype &&
      allowedMimeTypes.includes(
        file.mimetype.toLowerCase()
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG, WEBP, AVIF, BMP and TIFF images are allowed."
        )
      );
    }
  },
});

// =====================================================
// CONVERT IMAGE TO WEBP
// =====================================================

const convertToWebp = (options = {}) => {
  const {
    quality = 85,
    folder = "website",
    prefix = "image",
    resize = false,
    width = null,
    height = null,
    effort = 4,
  } = options;

  return async (req, res, next) => {
    try {
      // -------------------------------------------------
      // No image uploaded
      // -------------------------------------------------

      if (
        !req.file ||
        !req.file.buffer ||
        req.file.buffer.length === 0
      ) {
        return next();
      }

      // -------------------------------------------------
      // Clean folder
      // -------------------------------------------------

      const targetFolder = String(
        folder || "website"
      )
        .replace(/^[/\\]+|[/\\]+$/g, "")
        .replace(/\.\./g, "");

      // -------------------------------------------------
      // Create destination directory
      // -------------------------------------------------

      const targetDir = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        targetFolder
      );

      await fs.promises.mkdir(
        targetDir,
        {
          recursive: true,
        }
      );

      // -------------------------------------------------
      // Clean prefix
      // -------------------------------------------------

      const filePrefix = String(
        prefix || targetFolder
      ).replace(
        /[^a-zA-Z0-9_-]/g,
        "-"
      );

      // -------------------------------------------------
      // Unique filename
      // -------------------------------------------------

      const uniqueName =
        `${filePrefix}-${Date.now()}-${Math.round(
          Math.random() * 1000000000
        )}.webp`;

      const outputPath = path.join(
        targetDir,
        uniqueName
      );

      // -------------------------------------------------
      // Sharp
      // -------------------------------------------------

      let image = sharp(
        req.file.buffer
      ).rotate();

      // -------------------------------------------------
      // Optional resize
      // -------------------------------------------------

      if (resize) {
        const resizeOptions = {
          fit: "inside",
          withoutEnlargement: true,
        };

        if (width) {
          resizeOptions.width =
            Number(width);
        }

        if (height) {
          resizeOptions.height =
            Number(height);
        }

        image = image.resize(
          resizeOptions
        );
      }

      // -------------------------------------------------
      // Convert to WebP
      // -------------------------------------------------

      await image
        .webp({
          quality: Math.min(
            100,
            Math.max(
              1,
              Number(quality) || 85
            )
          ),

          effort: Math.min(
            6,
            Math.max(
              0,
              Number(effort) || 4
            )
          ),
        })
        .toFile(outputPath);

      // -------------------------------------------------
      // Attach processed file info
      // -------------------------------------------------

      req.file.filename =
        uniqueName;

      req.file.mimetype =
        "image/webp";

      req.file.path =
        outputPath;

      req.file.destination =
        targetDir;

      req.file.destinationPath =
        `/uploads/${targetFolder}/${uniqueName}`.replace(
          /\\/g,
          "/"
        );

      next();
    } catch (error) {
      console.error(
        "❌ WebP Conversion Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          `Image processing failed: ${error.message}`,
      });
    }
  };
};

// =====================================================
// DELETE INTERNAL FILE
// =====================================================
// This is ONLY used internally when replacing logo.
// There is NO DELETE BUTTON/API in frontend.
// =====================================================

const deleteUploadedFile = async (
  fileUrl
) => {
  try {
    if (!fileUrl) {
      return;
    }

    const cleanUrl = String(
      fileUrl
    )
      .replace(/^[/\\]+/, "")
      .replace(/\.\./g, "");

    const filePath = path.join(
      __dirname,
      "..",
      "public",
      cleanUrl
    );

    try {
      await fs.promises.access(
        filePath,
        fs.constants.F_OK
      );

      await fs.promises.unlink(
        filePath
      );

      console.log(
        "🗑️ Old website image deleted:",
        filePath
      );
    } catch (error) {
      // File does not exist.
      // Do not crash the request.
      if (error.code !== "ENOENT") {
        console.error(
          "❌ Old Image Delete Error:",
          error.message
        );
      }
    }
  } catch (error) {
    console.error(
      "❌ File Delete Error:",
      error.message
    );
  }
};

module.exports = {
  upload,
  convertToWebp,
  deleteUploadedFile,
};