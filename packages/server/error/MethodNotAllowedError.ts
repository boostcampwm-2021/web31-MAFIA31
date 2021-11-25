import ApplicationError from './ApplicationError';

class MethodNotAllowedError extends ApplicationError {
  constructor(msg: string) {
    super(msg, 405);
  }
}

export default MethodNotAllowedError;
