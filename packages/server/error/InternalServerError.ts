import ApplicationError from './ApplicationError';

class InternalServerError extends ApplicationError {
  constructor() {
    super('Internal Server Error.', 500);
  }
}

export default InternalServerError;
