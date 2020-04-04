
class AppError extends Error {
  constructor(message, error) {
    super(message);
    this.reason = error;
  }
}

module.exports = AppError;
