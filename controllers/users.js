const User = require('../models/user');

module.exports.findUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};
module.exports.findByIdUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};
module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })

    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })

    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};
