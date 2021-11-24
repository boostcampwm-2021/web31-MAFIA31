import ApplicationError from './ApplicationError';

class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestError;
