const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findCard, createCard, findByICardDelete, dislikeCard, likeCard, findByICard,
} = require('../controllers/cards');

routerCards.get('/cards', findCard);
routerCards.get('/cards', findByICard);
routerCards.delete('/cards:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
}), findByICardDelete);
routerCards.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
  }),
}), createCard);

routerCards.put('cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), likeCard);
routerCards.delete('cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), dislikeCard);
module.exports = routerCards;
