const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { errorHandler } = require('../utils/utils');

const { JWT_SECRET } = process.env;
module.exports.findUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'карточка или пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => { errorHandler(res, err); });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => { errorHandler(res, err); });
};

module.exports.createUser = (req, res) => {
  const { password, email } = req.body;
  bcrypt.hash(password, 10).then((hashPassword) => {
    User.create({ password: hashPassword, email })
      .then((user) => res.status(201).send({ _id: user._id }))
      .catch((err) => {
        if (err.code === 11000) {
          res.status(409).send({ message: 'Противоречивый запрос' });
        }
      })
      .catch((err) => { errorHandler(res, err); });
  });
};

module.exports.login = (req, res) => {
  const { password, email } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => { errorHandler(res, err); });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })

    .then((user) => res.status(200).send(user))
    .catch((err) => { errorHandler(res, err); });
};
