import { ExtendableError } from './ExtendableError';

/**
 * @description - Internal Server Error - 500
 */

class InternalServerError extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Internal Server Error');
    else super(m);

    // ? Set Prototype
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export { InternalServerError };
