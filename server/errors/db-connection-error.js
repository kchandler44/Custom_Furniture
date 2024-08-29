import { CustomError } from './custom-error.js';

export class DbConnectionError extends CustomError {
  constructor() {
    super('Database connection error');
    this.statusCode = 502;

    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }

  formatError() {
    return { message: 'Database connection error' };
  }
}
