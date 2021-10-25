const express = require('express');

const authentication = require('./authentication');
const user = require('./user');
const post = require('./post');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/authentication', authentication);
router.use('/user', user);
router.use('/post', post);

module.exports = router;
