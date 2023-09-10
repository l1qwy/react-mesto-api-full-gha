const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound');

router.use('/sign-in', signinRouter);
router.use('/sign-up', signupRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
