const AppError = require('./app-error');

class ValidationError extends AppError {
  constructor(message, error) {
    super(`ValidationError: ${message}`, error);
  }
}

module.exports = ValidationError;
