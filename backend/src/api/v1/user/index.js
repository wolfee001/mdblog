const express = require('express');
const { verifyToken } = require('../middleware/jwt');
const CryptoJS = require('crypto-js');
const User = require('../../../model/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/modify', verifyToken, async (req, res) => {
  try {
    const inputUser = {
      email: req.body.email,
      password: req.body.password ? CryptoJS.AES.encrypt(req.body.password, process.env.PASSPHRASE).toString() : undefined,
      name: req.body.name,
      avatar: req.body.avatar,
      emailIsPublic: req.body.emailIsPublic
    };

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      $set: inputUser
    }, { new: true });

    const accessToken = jwt.sign({
      id: updatedUser._id
    },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
    );

    const user = {
      username: updatedUser._doc.username,
      email: updatedUser._doc.email,
      name: updatedUser._doc.name,
      avatar: updatedUser._doc.avatar,
      emailIsPublic: updatedUser._doc.emailIsPublic
    };

    res.status(200).json({ user, accessToken });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete('/delete', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
