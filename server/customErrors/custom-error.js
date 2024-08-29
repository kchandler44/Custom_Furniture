// Custom Error class to reinforce error class structure
export class CustomError extends Error {
  constructor(message) {
    // Serves as the message for the Error class that CustomError is extending
    super(message);

    // Make sure properties we are setting end up on CustomError's prototype?
    Object.setPrototypeOf(this, CustomError.prototype);

    // Force subclasses to define statusCode and formatError
    if (this.constructor === CustomError) {
      throw new Error('Cannot instantiate class CustomError');
    }
  }

  //A method that subclasses must implement
  formatError() {
    throw new Error('Subclasses of CustomError must implement formatError');
  }
}