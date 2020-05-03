import AppError from './app-error';

export default class NotFoundError extends AppError {
  public constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}
