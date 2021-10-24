const express = require('express');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../../../model/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSPHRASE),
      name: req.body.name,
      avatar: req.body.avatar,
      emailIsPublic: req.body.emailIsPublic
    });

    const savedUser = await newUser.save();

    const accessToken = jwt.sign({
      id: savedUser._id
    },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
    );

    const user = {
      username: savedUser._doc.username,
      email: savedUser._doc.email,
      name: savedUser._doc.name,
      avatar: savedUser._doc.avatar,
      emailIsPublic: savedUser._doc.emailIsPublic
    };

    res.status(201).json({ user, accessToken });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ err: 'Wrong credentials!' });
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSPHRASE);
    const pwd = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (pwd !== req.body.password) {
      res.status(401).json({ err: 'Wrong credentials!' });
      return;
    }

    const accessToken = jwt.sign({
      id: user._id
    },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
    );

    const returnUser = {
      username: user._doc.username,
      email: user._doc.email,
      name: user._doc.name,
      avatar: user._doc.avatar,
      emailIsPublic: user._doc.emailIsPublic
    };

    res.status(200).json({ user: returnUser, accessToken });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
