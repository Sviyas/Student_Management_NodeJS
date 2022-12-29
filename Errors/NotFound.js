import { ExtendableError } from './ExtendableError';

/**
 * @description Not Found - 404
 */

class NotFound extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Not Found');
    super(m);
    // ? Prototype
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export { NotFound };
