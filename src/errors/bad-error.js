const statusCode = require('http-status-codes');
const CustomError = require('./custom-error');

class BadError extends CustomError {
  constructor (message) {
    super(message);
    this.statusCode = statusCode.BAD_REQUEST;
  }
}

module.exports = BadError;