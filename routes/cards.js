const router = require('express').Router();

const {
  findCard, createCard, findByICardDelete, dislikeCard, likeCard,
} = require('../controllers/cards');

router.get('/cards', findCard);
router.delete('/cards/:id', findByICardDelete);
router.post('/cards', createCard);
router.put('/likes/:cardId', likeCard);
router.delete('/likes/:cardId', dislikeCard);
module.exports = router;
