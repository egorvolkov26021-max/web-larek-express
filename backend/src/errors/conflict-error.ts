import CustomError from './custom-errors';

export default class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}
