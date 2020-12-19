const User = require('../models/user');
const { errorHandler, CastError } = require('../utils/utils');

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
    .catch((err) => { CastError(res, err); });
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })

    .then((user) => res.send({ data: user }))
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
