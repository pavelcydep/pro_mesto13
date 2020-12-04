const Card = require('../models/card');

module.exports.findCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};
module.exports.findByICard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};
module.exports.findByICardDelete = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
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
    });
};

module.exports.likeCard = (req, res) => {
  Card.findOneAndUpdate({ _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])

    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findOneAndUpdate({ _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])

    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).json({ message: `На сервере произошла ошибка:${err}` });
    });
};
