const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'some_key' } = process.env;
const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFound');
const ConflictError = require('../errors/conflict');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(httpConstants.HTTP_STATUS_OK).send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      }))
      .catch((error) => {
        if (error.code === 11000) {
          next(new ConflictError('Пользователь с данным Email уже зарегестрирован'));
        } else if (error.name === 'ValidationError') {
          next(new BadRequestError(error.message));
        } else {
          next(error);
        }
      }));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(httpConstants.HTTP_STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный индификатор'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(
          new NotFoundError('Пользователь с данным индификатором не найден'),
        );
      } else {
        next(error);
      }
    });
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: 'true', runValidators: true },
  )
    .orFail()
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с данным индификатором не найден'));
      } else {
        next(error);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: 'true', runValidators: true },
  )
    .orFail()
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с данным индификатором не найден'));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.status(httpConstants.HTTP_STATUS_OK).send({ token });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch(next);
};
