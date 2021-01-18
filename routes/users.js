const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findUser, getUserById, patchUser, patchUserAvatar,
} = require('../controllers/users');

routerUsers.get('/users', findUser);
routerUsers.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
}), getUserById);


routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
routerUsers.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
  }),
}), patchUserAvatar);

module.exports = routerUsers;
