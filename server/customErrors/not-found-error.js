import { CustomError } from './custom-error.js';

export class NotFoundError extends CustomError {
  constructor(message) {
    // This message will be console logged in error handling middleware
    super('Not found error');
    this.statusCode = 404;
  }

  // Formats the error message to send back to the client
  formatError() {
    return { message: 'Not found error' };
  }
}
