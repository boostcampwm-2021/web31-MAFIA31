import ApplicationError from './ApplicationError';

class InvalidRoomIdError extends ApplicationError {
  constructor() {
    super('Invalid Room Id.', 400);
  }
}

export default InvalidRoomIdError;
