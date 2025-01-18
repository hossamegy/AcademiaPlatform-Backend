const CustomError = require("./custom-error");
const statusCode = require('http-status-codes');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message)
    this.statusCode = statusCode.UNAUTHORIZED;
  }
};

module.exports = UnauthorizedError;