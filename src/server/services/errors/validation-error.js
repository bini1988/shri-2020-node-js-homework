const AppError = require('./app-error');

class ValidationError extends AppError {}

module.exports = ValidationError;
