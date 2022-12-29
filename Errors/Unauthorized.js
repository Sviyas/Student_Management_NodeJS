import { ExtendableError } from './ExtendableError';

/**
 * @description - Unauthorized - 401
 */

class Unauthorized extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Unauthorized');
    super(m);

    // ? Prototype
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

export { Unauthorized };
