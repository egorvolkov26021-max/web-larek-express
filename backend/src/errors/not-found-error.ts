import CustomError from './custom-errors';
import { NOT_FOUND } from '../constants/status-codes';

export default class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, NOT_FOUND);
  }
}
