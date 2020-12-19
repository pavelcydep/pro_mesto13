module.exports.errorHandler = (res, error) => {
  if (error.name === 'ValidationError') {
    res.status(400).send({ message: 'Не верный запрос' });
  } else res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports.CastError = (res, error) => {
  if (error.name === 'CastError') {
    res.status(404).send({ message: 'карточка или пользователь не найден' });
  } else res.status(500).send({ message: 'На сервере произошла ошибка' });
};
