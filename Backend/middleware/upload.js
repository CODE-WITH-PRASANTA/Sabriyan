const multer = require("multer"); // Removed the comment slashes
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

<<<<<<< HEAD
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

=======
const storage = multer.memoryStorage();

>>>>>>> 80188399821557018d7897d124989d3991398776
const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (
      file &&
      file.mimetype &&
<<<<<<< HEAD
      allowedMimeTypes.includes(
        file.mimetype.toLowerCase()
      )
=======
      file.mimetype.startsWith("image/")
>>>>>>> 80188399821557018d7897d124989d3991398776
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
<<<<<<< HEAD
          "Only JPG, JPEG, PNG, WEBP, AVIF, BMP and TIFF images are allowed."
=======
          "Only image files are allowed!"
>>>>>>> 80188399821557018d7897d124989d3991398776
        )
      );
    }
  },
});

<<<<<<< HEAD
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
=======
const convertToWebp = (options = {}) => {
  const {
    quality = 80,
    folder = "blogs",
    prefix = "blog",
    width,
    height,
>>>>>>> 80188399821557018d7897d124989d3991398776
  } = options;

  return async (req, res, next) => {
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 80188399821557018d7897d124989d3991398776

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

<<<<<<< HEAD
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
=======
module.exports = {
  upload,
  convertToWebp,
>>>>>>> 80188399821557018d7897d124989d3991398776
};