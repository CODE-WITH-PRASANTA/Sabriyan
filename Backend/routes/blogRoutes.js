const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const {
  upload,
  convertToWebp,
} = require("../middleware/upload");


// CREATE
router.post(
  "/",
  upload.fields([
    {
      name: "featuredImage",
      maxCount: 1,
    },
    {
      name: "thumbnailImage",
      maxCount: 1,
    },
  ]),
  convertToWebp({
    folder: "blogs",
    prefix: "blog",
    quality: 80,
  }),
  createBlog
);

// GET ALL
router.get("/", getBlogs);

// GET ONE
router.get("/:id", getBlogById);

// UPDATE
router.put(
  "/:id",
  upload.fields([
    {
      name: "featuredImage",
      maxCount: 1,
    },
    {
      name: "thumbnailImage",
      maxCount: 1,
    },
  ]),
  convertToWebp({
    folder: "blogs",
    prefix: "blog",
    quality: 80,
  }),
  updateBlog
);

// DELETE
router.delete(
  "/:id",
  deleteBlog
);

module.exports = router;