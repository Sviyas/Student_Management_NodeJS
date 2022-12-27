import baseValidator from './index';

const Joi = require('Joi');

// ? staff validator
export const staffValidator = async (req, res, next) => {
  const staffSchema = Joi.object({
    staff_name: Joi.string().min(4).max(10).required(),
    staff_role: Joi.string().max(10).required(),
    staff_phone: Joi.number().max(10).required(),
    staff_sub_role: Joi.string().max(10).required(),
    staff_attendance: Joi.number().required()
  });
  await baseValidator(req, res, next, staffSchema);
};
