const Blog = require("../models/blog.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { param } = require("../routes/blog.route");

const SECRET = process.env.JWT_KEY;

module.exports = {
  create: (req, res) => {
    const { title, summary, content } = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, async (error, info) => {
      try {
        const newBlog = await Blog.create({
          title,
          summary,
          cover: newPath,
          content,
          author: info.id,
        });
        res.status(200).json(newBlog);
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },
  showAll: async (req, res) => {
    const getAllBlog = await Blog.find().populate("author", ["name"]);
    res.status(200).json(getAllBlog);
  },
  showById: async (req, res) => {
    const { blog_id } = req.params;
    const getById = await Blog.findById(blog_id).populate("author", ["name"]);
    res.status(200).json(getById);
  },
  upload: async (req, res) => {
    const { blog_id, title, summary, content } = req.body;

    const newPath = null;
    if (req.file !== undefined) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, async (error, info) => {
      try {
        const blog = await Blog.findById(blog_id);
        const isAuthor =
          JSON.stringify(blog.author) === JSON.stringify(info.id);
        if (!isAuthor) res.status(500).json(error.message);
        await blog.updateOne({
          title,
          summary,
          content,
          cover: newPath ? newPath : blog.cover,
        });
        res.status(200).json(newBlog);
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },
};
