const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// CREATE a post
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }
    const newPost = await Post.create({ title, content });
    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(200).json({ message: "Post deleted successfully!", deletedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;