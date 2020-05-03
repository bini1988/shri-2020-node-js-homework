export default class AppError extends Error {
  public type: string;
  public status: number;
  public constructor(
    message = 'Server has fallen into unrecoverable problem',
    type = 'Internal Error',
    status = 500,
  ) {
    super(message);
    this.type = type;
    this.status = status;
  }
}
