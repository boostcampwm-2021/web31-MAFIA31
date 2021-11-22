class ApplicationError extends Error {
  message;

  status;

  constructor(message: string, status: number) {
    super();

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;
  }
}

export default ApplicationError;
