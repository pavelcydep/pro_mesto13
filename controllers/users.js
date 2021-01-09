const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/customError');
const User = require('../models/user');


const { JWT_SECRET = 'dev-key' } = process.env;
module.exports.findUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
 .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => {
    res.send({ data: user });
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
  .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { password, email } = req.body;
bcrypt.hash(password, 10).then((hashPassword) => {
    User.create({ password: hashPassword, email })
      .then((user) => res.status(201).send({ _id: user._id }))
      .catch((err) => {
        if (err.code === 11000) {
          res.status(409).send({ message: 'Противоречивый запрос' });
        }
      })
      .catch(next);
  });
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
  .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};