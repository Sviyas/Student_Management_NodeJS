import { getReasonPhrase } from 'http-status-codes';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import { MESSAGE } from '../constants/message';

/**
 *
 * @param {*} err - Error
 * @param {*} res - Message
 */
const errorHandleMangeer = async (err, res) => {
  let errror = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  let message = MESSAGE.INTERNAL_SERVER_ERROR;
  let statusCode = MESSAGE.INTERNAL_SERVER_ERROR;

  // ! 400
};
