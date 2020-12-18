const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,

    minlength: 2,
    maxlength: 30,
    required: true,
  },

  about: {
    type: String,

    minlength: 2,
    maxlength: 30,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/.test(v);
      },
      message: 'Указана некорректная ссылка',
    },
    default: 'https://www.shareicon.net/data/2017/05/09/885769_user_512x512.png',
  },
});
module.exports = mongoose.model('user', userSchema);
