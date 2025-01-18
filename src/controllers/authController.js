const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
const bcrypt = require('bcrypt');
const asyncWrapper = require('../middlewares/async-wrapper');
const BadError = require('../errors/bad-error');
const Users = require('../models/userModel');

const UnauthorizedError = require('../errors/unauthorized-error');

const generateToken = (payload) => jwt.sign(
  payload,
  process.env.JWT_SECRET_KEY,
  {
    expiresIn: process.env.JWT_EXPIRED_TIME
  }
);


const signUp = asyncWrapper(async (req, res) => {
  const user = await Users.create(
    {
      img: req.body.img,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userPhoneNumber: req.body.userPhoneNumber,
      parentPhoneNumber: req.body.parentPhoneNumber,
      email: req.body.email,
      password: req.body.password,
      proofOfIdentity: req.body.proofOfIdentity,
      classes: req.body.classes,
      section: req.body.section,
      school: req.body.school,
      birthDate: req.body.birthDate,
      city: req.body.city,
    },
  );

  const token = generateToken({
    userID: user.id,
    userBirthDate: user.birthDate,
  });

  res.status(statusCode.CREATED).json({ message: { UserInfo: user, Token: token } });
});

const login = asyncWrapper(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new BadError('incorrect E-mail or password'));
  };

  const token = generateToken({
    userID: user.id,
    userBirthDate: user.birthDate,
  });

  res.status(statusCode.OK).json({ message: { user: user, token: token } });

});

module.exports = {
  signUp,
  login,
};