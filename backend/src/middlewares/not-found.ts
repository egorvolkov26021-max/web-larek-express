import { RequestHandler } from 'express';
import NotFoundError from '../errors/not-found-error';

const notFound: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Маршрут ${req.method} ${req.url} не найден`));
};

export default notFound;
