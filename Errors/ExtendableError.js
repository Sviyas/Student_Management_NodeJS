/**
 * @description - ExtendableError Base Class
 */
class ExtendableError extends Error {
  isReligion;

  constructor(message, isReligion = false) {
    if (new.target === ExtendableError) {
      throw new 'Abstract class "ExtendableErro" cannot be insantiated directly'();
    }

    super(message);
    this.name = this.constructor.name;
    this.isReligion = isReligion;
    this.message = message;

    // ? Prototype
    Object.setPrototypeOf(this, ExtendableError.prototype);
  }
}

export { ExtendableError };
