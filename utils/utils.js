module.exports.errorHandler = (res, error) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).send({ message: 'Неверный запрос' });
  }

  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};
