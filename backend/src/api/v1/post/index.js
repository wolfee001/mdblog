const express = require('express');
const { verifyToken } = require('../middleware/jwt');
const Post = require('../../../model/Post');

const router = express.Router();

router.put('/create', verifyToken, async (req, res) => {
  try {
    const newPost = new Post({
      authorID: req.user.id,
      title: 'Article title',
      short: 'Short description of the article',
      text: '# Lorem ipsum, dolor sit amet!',
      public: false,
      categories: ['Personal']
    });

    const savedPost = await newPost.save();

    res.status(201).json({ id: savedPost._id });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get('/edit/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.authorID !== req.user.id) {
      throw new Error('unauthorized');
    }

    const retVal = {
      image: post.image,
      title: post.title,
      short: post.short,
      text: post.text,
      public: post.public,
      categories: post.categories
    };

    res.status(201).json(retVal);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/edit/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.authorID !== req.user.id) {
      throw new Error('unauthorized');
    }

    await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    res.status(200).json();
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
