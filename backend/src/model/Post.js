const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    authorID: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    short: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    public: {
      type: Boolean,
      required: true
    },
    categories: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
