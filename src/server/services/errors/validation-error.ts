import AppError from './app-error';

export default class ValidationError extends AppError {
  public constructor(message: string) {
    super(message, 'ValidationError', 200);
  }
}
