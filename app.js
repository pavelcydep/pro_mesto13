const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');

const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5fda0f336d48c328e42126cd',
  };

  next();
});

app.use('/', routerCards);
app.use('/', routerUsers);

app.use('/', (req, res) => {
  res.status(400).send({
    message: 'Запрашиваемый ресурс не найден',
  });
});
app.listen(PORT, () => {
});
