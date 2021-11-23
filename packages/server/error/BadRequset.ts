import ApplicationError from './ApplicationError';

class BadRequest extends ApplicationError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequest;
