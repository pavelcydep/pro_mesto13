const routerUsers = require('express').Router();

const {
  findUser, getUserById, createUser, patchUser, patchUserAvatar,
} = require('../controllers/users');

routerUsers.get('/users', findUser);
routerUsers.get('/users/:id', getUserById);
routerUsers.post('/users', createUser);
routerUsers.patch('/users/me', patchUser);
routerUsers.patch('/users/me/avatar', patchUserAvatar);

module.exports = routerUsers;
