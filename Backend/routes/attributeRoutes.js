const express = require('express');
const router = express.Router();
const {
  getAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  toggleAttributeStatus,
  deleteAttribute,
} = require("../controllers/attributeController");

router.route('/')
  .get(getAttributes)
  .post(createAttribute);

router.route('/:id')
  .get(getAttributeById)
  .put(updateAttribute)
  .delete(deleteAttribute);

router.route('/:id/status')
  .patch(toggleAttributeStatus);

module.exports = router;