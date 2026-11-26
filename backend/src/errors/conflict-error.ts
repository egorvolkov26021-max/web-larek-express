import CustomError from './custom-errors';
import { CONFLICT } from '../constants/status-codes';

export default class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, CONFLICT);
  }
}
