const routerCards = require('express').Router();

const {
  findCard, createCard, findByICardDelete, dislikeCard, likeCard,
} = require('../controllers/cards');

routerCards.get('/cards', findCard);
routerCards.delete('/cards/:id', findByICardDelete);
routerCards.post('/cards', createCard);
routerCards.put('/likes/:cardId', likeCard);
routerCards.delete('/likes/:cardId', dislikeCard);
module.exports = routerCards;
