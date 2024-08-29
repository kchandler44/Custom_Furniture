import { CustomError } from './custom-error.js';

export class BadRequestError extends CustomError {
  constructor(message) {
    // This message will be console logged in error handling middleware
    super(`Bad request error: ${message}`);
    this.statusCode = 400;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  // Formats the error message to send back to the client
  formatError() {
    return { message: this.message };
  }
}
