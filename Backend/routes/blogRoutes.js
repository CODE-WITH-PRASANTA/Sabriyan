const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

const cpUpload = upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'thumbnailImage', maxCount: 1 }
]);

router.route('/')
  .get(getBlogs)
  .post(cpUpload, createBlog);

router.route('/:id')
  .get(getBlogById)
  .put(cpUpload, updateBlog)
  .delete(deleteBlog);

module.exports = router;