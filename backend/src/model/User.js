const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    emailIsPublic: {
      type: Boolean,
      required: true
    },
    articles: [
      {
        id: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
