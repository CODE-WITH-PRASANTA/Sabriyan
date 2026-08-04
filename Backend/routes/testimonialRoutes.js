const express = require('express');
const router = express.Router();
const { upload, convertToWebp } = require('../middleware/upload');
const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

router
  .route('/')
  .get(getTestimonials)
  .post(
    upload.single('image'),
    convertToWebp({ quality: 80, folder: 'testimonials', prefix: 'testimonial' }),
    createTestimonial
  );

router
  .route('/:id')
  .get(getTestimonialById)
  .put(
    upload.single('image'),
    convertToWebp({ quality: 80, folder: 'testimonials', prefix: 'testimonial' }),
    updateTestimonial
  )
  .delete(deleteTestimonial);

module.exports = router;