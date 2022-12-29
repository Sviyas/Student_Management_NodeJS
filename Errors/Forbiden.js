import { ExtendableError } from './ExtendableError';

/**
 * @description - Forbiden - 403
 */

class Forbiden extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Forbiden');
    else super(m);

    // ? Prototype
    Object.setPrototypeOf(this, Forbiden.prototype);
  }
}

export { Forbiden };
