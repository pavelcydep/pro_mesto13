const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
};
