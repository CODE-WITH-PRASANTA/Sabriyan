const express = require('express');
const router = express.Router();
const { upload, convertToWebp } = require("../middleware/upload");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/premiumCollectionController");

// Multer upload fields definition
const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'bgImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
]);

router
  .route('/')
  .get(getProducts)
  .post(
    cpUpload,
    convertToWebp({ quality: 80, folder: 'products', prefix: 'product' }),
    createProduct
  );

router
  .route('/:id')
  .get(getProductById)
  .put(
    cpUpload,
    convertToWebp({ quality: 80, folder: 'products', prefix: 'product' }),
    updateProduct
  )
  .delete(deleteProduct);

module.exports = router;