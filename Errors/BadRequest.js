import { ExtendableError } from './ExtendableError';

/**
 * @description = Bad Request - 400
 */

class BadRequest extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Bad Request');
    else super(m);

    // ? prototype
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export { BadRequest };
