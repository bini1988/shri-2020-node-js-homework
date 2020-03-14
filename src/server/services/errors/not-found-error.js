const AppError = require('./app-error');

class NotFoundError extends AppError {
  constructor(message) {
    super(`NotFoundError: ${message}`);
  }
}

module.exports = NotFoundError;
