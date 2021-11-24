import ApplicationError from './ApplicationError';

class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message, 401);
  }
}

export default UnauthorizedError;
