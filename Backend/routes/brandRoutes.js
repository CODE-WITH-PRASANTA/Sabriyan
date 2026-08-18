const express = require('express');
const router = express.Router();

// Ensure path accurately points to the middleware file
const { upload, convertToWebp } = require("../middleware/upload");

const {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  toggleBrandStatus,
  deleteBrand,
} = require("../controllers/brandController");

const brandImageWebp = convertToWebp({
  folder: 'brands',
  prefix: 'brand',
  quality: 80,
});

router.route('/')
  .get(getBrands)
  .post(upload.single('image'), brandImageWebp, createBrand);

router.route('/:id')
  .get(getBrandById)
  .put(upload.single('image'), brandImageWebp, updateBrand)
  .delete(deleteBrand);

router.route('/:id/status')
  .patch(toggleBrandStatus);

module.exports = router;