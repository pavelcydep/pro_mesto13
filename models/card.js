const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/.test(v);
      },
      message: 'Указана некорректная ссылка',
    },
  },
  owner:
        {
          type: mongoose.Types.ObjectId,
          ref: 'user',
          default: [],
        },

  likes:
    [{
      type: mongoose.Types.ObjectId,
      ref: 'user',
      default: [],
    }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardsSchema);