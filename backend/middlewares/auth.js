const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'secret_key' } = process.env;
const UnauthorizedError = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
