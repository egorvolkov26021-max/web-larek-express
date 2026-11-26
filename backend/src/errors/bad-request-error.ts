import CustomError from './custom-errors';
import { BAD_REQUEST } from '../constants/status-codes';

export default class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, BAD_REQUEST);
  }
}
