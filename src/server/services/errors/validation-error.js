const AppError = require('./app-error');

class ValidationError extends AppError {
  constructor(message) {
    super(`ValidationError: ${message}`);
  }
}

module.exports = ValidationError;
