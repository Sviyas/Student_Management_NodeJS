import Joi from 'joi';
import baseValidator from '.';

export const departmentValidator = async (req, res, next) => {
  const departmentSchema = Joi.object({
    dep_name: Joi.string().max(10).required()
  });
  await baseValidator(req, res, next, departmentSchema);
};
