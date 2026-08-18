const express = require('express');
const router = express.Router();
const {
  getItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/inventoryController');

router.route('/')
  .get(getItems)
  .post(createItem);

router.route('/:id')
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;