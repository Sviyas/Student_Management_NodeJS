import { ExtendableError } from './ExtendableError';

/**
 * @description - UnprocessableEntity - 422
 */

class UnprocessableEntity extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Unprocessable Entity');
    super(m);

    // ? Prototype
    Object.setPrototypeOf(this, UnprocessableEntity.setPrototypeOf);
  }
}

export { UnprocessableEntity };
