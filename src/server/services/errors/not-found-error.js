const AppError = require('./app-error');

class NotFoundError extends AppError {
  constructor(message, error) {
    super(`NotFoundError: ${message}`, error);
  }
}

module.exports = NotFoundError;
