/**
 *
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - next Function middleware
 * @param {*} schema - Object Query Schema
 * @returns
 */
const baseValidator = async (req, res, next, schema) => {
  try {
    await schema.validateAsync(req.body);

    // console.log('schema identifer', value);
    next();
  } catch (err) {
    const errror = JSON.parse(JSON.stringify(err.message));
    // console.log('🚀 ~ file: index.js:9 ~ baseValidator ~ errror', errror);

    if (errror) {
      // const message = `please provide a correct credintials`;

      return res.status(411).json({
        result: false,
        message: `please provide a correct credintials`
      });
    }
  }
};

export default baseValidator;
