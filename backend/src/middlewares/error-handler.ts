import { ErrorRequestHandler } from 'express';
import { Error as MongooseError } from 'mongoose';
import CustomError from '../errors/custom-errors';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let error = err;
  if (err instanceof MongooseError.ValidationError || err instanceof MongooseError.CastError) {
    error = new BadRequestError(err.message);
  } else if (err?.code === 11000) {
    error = new ConflictError('Товар с таким title уже существует');
  } else if (err?.type === 'entity.parse.failed') {
    error = new BadRequestError('Некорректный JSON');
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  return res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};

export default errorHandler;
