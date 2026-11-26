import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import './models/product';
import { errors } from 'celebrate';
import productRouter from './routers/product';
import orderRouter from './routers/order';
import errorHandler from './middlewares/error-handler';
import notFound from './middlewares/not-found';
import {
  requestLogger,
  errorLogger,
} from './middlewares/logger';

dotenv.config();
const {
  PORT = '3000',
  DB_ADDRESS,
  ORIGIN_ALLOW,
} = process.env;

if (!DB_ADDRESS) {
  console.error('DB_ADDRESS не задан в .env');
  process.exit(1);
}

const app = express();
app.use(requestLogger);
app.use(cors({ origin: ORIGIN_ALLOW }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(productRouter);
app.use(orderRouter);

app.use(notFound);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log('Подключено к MongoDB');
    app.listen(Number(PORT), () => console.log(`Сервер запущен на порту ${PORT}`));
  })
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);
  });
