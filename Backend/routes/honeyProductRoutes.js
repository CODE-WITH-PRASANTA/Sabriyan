const express = require('express');
const router = express.Router();

const { upload, convertToWebp } = require("../middleware/upload");
const {
  createHoneyProduct,
  getHoneyProducts,
  getHoneyProductById,
  updateHoneyProduct,
  deleteHoneyProduct,
} = require("../controllers/honeyProductController");

const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'galleryImages', maxCount: 8 },
]);

router
  .route('/')
  .post(cpUpload, convertToWebp({ quality: 80 }), createHoneyProduct)
  .get(getHoneyProducts);

router
  .route('/:id')
  .get(getHoneyProductById)
  .put(cpUpload, convertToWebp({ quality: 80 }), updateHoneyProduct)
  .delete(deleteHoneyProduct);

module.exports = router;