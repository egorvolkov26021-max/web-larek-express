import CustomError from './custom-errors';

export default class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
