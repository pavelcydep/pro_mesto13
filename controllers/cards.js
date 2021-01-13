const Card = require('../models/card');
const CustomError = require('../errors/customError');

module.exports.findCard = (req, res, next) => {
  Card.find({})

    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.findByICard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((card) => {
      Card.findById(card._id).populate(['owner'])

        .then((createdCard) => {
          res.status(200).send(createdCard);
        });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findOneAndUpdate({ _id: req.params.id },
    { $addToSet: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.findByICardDelete = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
