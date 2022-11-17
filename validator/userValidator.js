import baseValidator from '.';

const Joi = require('Joi');

export const signUpValidator = async (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    standard: Joi.string().max(5).required(),
    phone: Joi.string().max(10).required(),
    email: Joi.string().min(3).max(50).required(),
    passcode: Joi.string()
      .min(3)
      .max(9)
      .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
      .required(),
    address: Joi.string().required(),
    stud_sub: Joi.string().required(),
    stud_attendance: Joi.number().required()
  });
  // console.log('schema', userSchema);
  await baseValidator(req, res, next, userSchema);
};

export const loginValidator = async (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    passcode: Joi.string()
      .min(3)
      .max(9)
      .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
      .required()
  });
  await baseValidator(req, res, next, userSchema);
};
