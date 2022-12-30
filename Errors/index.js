import { getReasonPhrase } from 'http-status-codes';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import Joi from 'joi';
import { MESSAGE } from '../constants/message';
import { BadRequest } from './BadRequest';
import { Forbiden } from './Forbiden';
import { Unauthorized } from './Unauthorized';
import { NotFound } from './NotFound';
import { UnprocessableEntity } from './UnprocessableEntity';

/**
 *
 * @param {*} err - Error
 * @param {*} res - Response
 */
const errorHandleMangeer = async (err, res) => {
  let error = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  let message = MESSAGE.INTERNAL_SERVER_ERROR;
  let statusCode = MESSAGE.INTERNAL_SERVER_ERROR;
  let isRelogin;

  // ! 400
  if (err instanceof BadRequest || Joi.ValidationError) {
    error = getReasonPhrase(StatusCodes.BAD_REQUEST);
    message = err.message.split('"').join('');
    statusCode = StatusCodes.BAD_REQUEST;
  }

  // ! 401
  if (err instanceof Unauthorized) {
    error = getReasonPhrase(StatusCodes.UNAUTHORIZED);
    message = err.message;
    statusCode = StatusCodes.UNAUTHORIZED;
  }

  // ! 403
  if (err instanceof Forbiden) {
    error = getReasonPhrase(StatusCodes.FORBIDDEN);
    message = err.message;
    statusCode = StatusCodes.FORBIDDEN;
  }

  // ! 404
  if (err instanceof NotFound) {
    error = getReasonPhrase(StatusCodes.NOT_FOUND);
    message = err.message;
    statusCode = StatusCodes.NOT_FOUND;
  }

  // ! 429
  if (err instanceof UnprocessableEntity) {
    error = getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY);
    message = err.message;
    StatusCodes = StatusCodes.UNPROCESSABLE_ENTITY;
  }

  // ! 500
  if (StatusCodes === 500) {
    switch (err.code) {
      case 'ER_TRUNCATED_WRONG_VALUE':
      case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD': {
        error = getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY);
        message = 'Give proper input values.';
        statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

        break;
      }
      default:
    }
  } else logger.log({ code: statusCode, message, error, trace: err?.stack, level: 'info' });

  return res.status(StatusCodes).json({
    result: false,
    error,
    message,
    isRelogin
  });
};

export default errorHandleMangeer;
