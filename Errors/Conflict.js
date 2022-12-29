import { ExtendableError } from './ExtendableError';

/**
 * @description - Conflict - 409
 */

class Conflict extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Conflict');
    else super(m);

    // ? Prototype
    Object.setPrototypeOf(this, Conflict.prototype);
  }
}

export { Conflict };
