const Card = require('../models/card');
const { errorHandler, CastError } = require('../utils/utils');

module.exports.findCard = (req, res) => {
  Card.find({})

    .then((card) => res.status(200).send(card))
    .catch((err) => { errorHandler(res, err); });
};

module.exports.findByICard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => { CastError(res, err); });
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
    .catch((err) => { errorHandler(res, err); });
};

module.exports.likeCard = (req, res) => {
  Card.findOneAndUpdate({ _id: req.params.id },
    { $addToSet: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])

    .then((card) => res.status(200).send(card))

    .catch((err) => { CastError(res, err); });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => { CastError(res, err); });
};

module.exports.findByICardDelete = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'карточка или пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => { CastError(res, err); });
};
