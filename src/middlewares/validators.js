const statusCode = require('http-status-codes');
const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  next()
};

module.exports = validatorMiddleware;