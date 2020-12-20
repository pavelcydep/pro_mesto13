const routerCards = require('express').Router();

const {
  findCard, createCard, findByICardDelete, dislikeCard, likeCard,
} = require('../controllers/cards');

routerCards.get('/cards', findCard);
routerCards.delete('/cards/:id', findByICardDelete);
routerCards.post('/cards', createCard);
routerCards.put('/cards/:cardId/likes', likeCard);
routerCards.delete('/cards/:cardId/likes', dislikeCard);
module.exports = routerCards;
