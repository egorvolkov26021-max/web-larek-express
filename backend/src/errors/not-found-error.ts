import CustomError from './custom-errors';

export default class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}
