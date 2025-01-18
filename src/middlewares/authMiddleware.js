const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middlewares/async-wrapper');
const Users = require('../models/userModel');
const UnauthorizedError = require('../errors/unauthorized-error');

const authMiddleware = asyncWrapper(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new UnauthorizedError('You are not logged in. Please log in to get access to this route.'));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await Users.findById(decoded.userID);
  if (!currentUser) {
    return next(new UnauthorizedError('The user that belong to this token does no longer exist'));
  }
  
  const passChangeTimeStamp = parseInt(
    currentUser.passwordChangeAt.getTime() / 1000,
    10 
  );
  if (passChangeTimeStamp > decoded.iat) {
    next( new UnauthorizedError('User recently changed his password, please login again...'));
  }
  req.user = currentUser;
  next()
});

module.exports = {
  authMiddleware
};
