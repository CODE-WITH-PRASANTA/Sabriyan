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
      file.mimetype.startsWith("image/") &&
      allowedMimeTypes.includes(file.mimetype.toLowerCase())
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

<<<<<<< HEAD
// Middleware Factory: Convert Buffer(s) to Optimized WebP
const convertToWebp = (options = {}) => {
  const {
    quality = 80,
    folder = "blogs",
    prefix = "blog",
=======
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
>>>>>>> 6f93290034a3566a4452edf11a2d032388673970
  } = options;

  return async (req, res, next) => {
    try {
<<<<<<< HEAD
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
=======
      // =================================================
      // SINGLE IMAGE: req.file
      // =================================================

      if (req.file && req.file.buffer) {
        const targetFolder = String(folder || "website")
          .replace(/^[\/\\]+|[\/\\]+$/g, "")
          .replace(/\.\./g, "");

        const targetDir = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          targetFolder
        );

        await fs.promises.mkdir(targetDir, {
          recursive: true,
        });

        const filePrefix = String(
          prefix || targetFolder
        ).replace(/[^a-zA-Z0-9_-]/g, "-");

        const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(
          Math.random() * 1000000000
        )}.webp`;

        const outputPath = path.join(
          targetDir,
          uniqueName
        );

        // -----------------------------------------------
        // SHARP IMAGE PROCESSING
        // -----------------------------------------------

        let image = sharp(req.file.buffer).rotate();

        // -----------------------------------------------
        // OPTIONAL RESIZE
        // -----------------------------------------------

        if (resize) {
          const resizeOptions = {
            fit: "inside",
            withoutEnlargement: true,
          };

          if (width) {
            resizeOptions.width = Number(width);
          }

          if (height) {
            resizeOptions.height = Number(height);
          }

          image = image.resize(resizeOptions);
        }

        // -----------------------------------------------
        // CONVERT TO WEBP
        // -----------------------------------------------

        await image
          .webp({
            quality: Math.min(
              100,
              Math.max(1, Number(quality) || 85)
            ),

            effort: Math.min(
              6,
              Math.max(0, Number(effort) || 4)
            ),
          })
          .toFile(outputPath);

        // -----------------------------------------------
        // UPDATE MULTER FILE INFORMATION
        // -----------------------------------------------

        req.file.filename = uniqueName;
        req.file.mimetype = "image/webp";
        req.file.path = outputPath;
        req.file.destination = targetDir;

        req.file.destinationPath =
          `/uploads/${targetFolder}/${uniqueName}`.replace(
            /\\/g,
            "/"
          );
      }

      // =================================================
      // MULTIPLE IMAGES: req.files
      // =================================================

      if (req.files) {
        const targetFolder = String(folder || "website")
          .replace(/^[\/\\]+|[\/\\]+$/g, "")
          .replace(/\.\./g, "");

        const targetDir = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          targetFolder
        );

        await fs.promises.mkdir(targetDir, {
          recursive: true,
        });

        // -----------------------------------------------
        // PROCESS MULTIPLE IMAGES
        // -----------------------------------------------

        const processImage = async (
          file,
          filePrefix
        ) => {
          if (!file || !file.buffer) {
            return null;
          }

          const uniqueName = `${filePrefix}-${Date.now()}-${Math.round(
            Math.random() * 1000000000
          )}.webp`;

          const outputPath = path.join(
            targetDir,
            uniqueName
          );

          let image = sharp(file.buffer).rotate();

          // Optional resize
          if (width || height) {
            image = image.resize({
              width: width ? Number(width) : undefined,
              height: height ? Number(height) : undefined,
              fit: "cover",
              withoutEnlargement: true,
            });
          }

          // Convert to WebP
          await image
            .webp({
              quality: Math.min(
                100,
                Math.max(1, Number(quality) || 85)
              ),

              effort: Math.min(
                6,
                Math.max(0, Number(effort) || 4)
              ),
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

        // -----------------------------------------------
        // FEATURED IMAGE
        // -----------------------------------------------

        if (req.files.featuredImage) {
          req.files.featuredImage =
            await Promise.all(
              req.files.featuredImage.map((file) =>
                processImage(
                  file,
                  `${prefix}-featured`
                )
              )
            );
        }

        // -----------------------------------------------
        // THUMBNAIL IMAGE
        // -----------------------------------------------

        if (req.files.thumbnailImage) {
          req.files.thumbnailImage =
            await Promise.all(
              req.files.thumbnailImage.map((file) =>
                processImage(
                  file,
                  `${prefix}-thumbnail`
                )
              )
            );
        }
      }

      // =================================================
      // NEXT MIDDLEWARE
      // =================================================
>>>>>>> 6f93290034a3566a4452edf11a2d032388673970

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

// =====================================================
// DELETE INTERNAL FILE
// =====================================================
// This is ONLY used internally when replacing logo.
// There is NO DELETE BUTTON/API in frontend.
// =====================================================

const deleteUploadedFile = async (fileUrl) => {
  try {
    if (!fileUrl) {
      return;
    }

    const cleanUrl = String(fileUrl)
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

      await fs.promises.unlink(filePath);

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

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  upload,
  convertToWebp,
  deleteUploadedFile,
};