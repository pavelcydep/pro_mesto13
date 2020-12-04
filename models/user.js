const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v);
      },
      message: 'Указан некорректный email',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Ваше имя',
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'О вас',
  },

  avatar: {
    type: String,
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
