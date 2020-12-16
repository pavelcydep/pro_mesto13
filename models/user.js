const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

 
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
   
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