const Blog = require('../models/Blog.models'); // Ensure the filename matches the file in your models directory
const { status } = require('../constants');
const User = require('../models/User.models');

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const user = await User.findById(req.user._id);

  const imageUrl = req.file.path;
  try {
    const blog = new Blog({
      title,
      content,
      imageUrl,
      author: req.user._id,
    });
    await blog.save();
    user.posts.push(blog._id);
    await user.save();

    
    res.status(status.CREATED).json({ blog });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username email');
    res.status(status.OK).json({ blogs });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');
    if (!blog) {
      return res.status(status.NOT_FOUND).json({ message: 'Blog not found' });
    }
    res.status(status.OK).json({ blog });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(status.NOT_FOUND).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(status.UNAUTHORIZED).json({ message: 'You are not authorized to update this blog' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    if (req.file) {
      blog.imageUrl = req.file.path;
    }
    await blog.save();
    res.status(status.OK).json({ blog });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!blog) {
      return res.status(status.NOT_FOUND).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(status.UNAUTHORIZED).json({ message: 'You are not authorized to delete this blog' });
    }

    user.posts.remove(blog._id);
    await user.save();
    await blog.remove();
    res.status(status.OK).json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
