const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/contactController");

router
  .route('/')
  .post(createInquiry)
  .get(getInquiries);

router
  .route('/:id')
  .get(getInquiryById)
  .put(updateInquiryStatus)
  .delete(deleteInquiry);

module.exports = router;