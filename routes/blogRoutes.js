const express = require('express');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.route('/').get(getBlogs).post(protect, upload.single('image'), createBlog);
router.route('/:id').get(getBlogById).put(protect, upload.single('image'), updateBlog).delete(protect, deleteBlog);

module.exports = router;
