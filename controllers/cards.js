const Card = require('../models/card');

module.exports.findCard = (req, res) => {
  Card.find({})

    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};

module.exports.findByICard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не удалось найти пользователя с id ' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id).populate(['owner'])

        .then((createdCard) => {
          res.status(200).send(createdCard);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Карточки с таким id не существует' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findOneAndUpdate({ _id: req.params.id },
    { $addToSet: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])

    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не удалось найти пользователя с id ' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не удалось найти пользователя с id ' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.findByICardDelete = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
        return;
      }
      res.send({ data: user });
    });
};
