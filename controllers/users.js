const User = require('../models/user');
const CustomError = require('../utils/utils');
module.exports.findUser = 
(req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));};

    module.exports.getUser = (req, res) => {
      User.findById(req.params.userId)
        .then((user) => {
          if (user === null) {
            res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
            return;
          }
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: `Не удалось найти пользователя с userId - ${req.params.userId}` });
          } else res.status(500).send({ message: 'На сервере произошла ошибка' });
        });
    };
    
    module.exports.createUser = (req, res) => {
      const { name, about, avatar } = req.body;
    
      User.create({ name, about, avatar })
        .then((user) => res.send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(400).send({ message: err.message });
          } else res.status(500).send({ message: 'На сервере произошла ошибка' });
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