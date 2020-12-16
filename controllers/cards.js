const Card = require('../models/card');
const CustomError = require('../utils/utils');
module.exports.findCard = (req, res) => {
  Card.find({})
  
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    res.status(404).json({ message: `На сервере произошла ошибка:${err}` });
  });
};

module.exports.findByICard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(next);
  
};
module.exports.findByICardDelete = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
    
};

module.exports.createCard = (req, res,next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id).populate(['owner'])
      
      .then((createdCard) => {
        res.status(200).send(createdCard);
      });
  
  res.status(400).json({ message: `На сервере произошла ошибка:${err}` });
});
};
        

module.exports.likeCard = (req, res,next) => {
  Card.findOneAndUpdate({ _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

    

module.exports.dislikeCard = (req, res,next) => {
  Card.findOneAndUpdate({ _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true }).populate(['owner', 'likes'])
    .orFail(new CustomError(404, 'Данного id нет в базе'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

    