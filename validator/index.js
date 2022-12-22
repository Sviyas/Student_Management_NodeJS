const baseValidator = async (req, res, next, schema) => {
  try {
    const value = await schema.validateAsync(req.body);

    console.log('schema identifer', value);
    next();
  } catch (err) {
    return res.status(403).json({
      result: false,
      message: 'Validtor length must be valid'
    });
  }
};

export default baseValidator;
