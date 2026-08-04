const express = require('express');
const router = express.Router();
const { upload, convertToWebp } = require("../middleware/upload");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router
  .route('/')
  .get(getCategories)
  .post(
    upload.single('image'),
    convertToWebp({ quality: 80, folder: 'categories', prefix: 'category' }),
    createCategory
  );

router
  .route('/:id')
  .get(getCategoryById)
  .put(
    upload.single('image'),
    convertToWebp({ quality: 80, folder: 'categories', prefix: 'category' }),
    updateCategory
  )
  .delete(deleteCategory);

module.exports = router;