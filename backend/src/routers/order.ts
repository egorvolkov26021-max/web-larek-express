import { Router } from 'express';
import { createOrder } from '../controllers/order';
import { validateOrderBody } from '../middlewares/validation';

const orderRouter = Router();

orderRouter.post('/order', validateOrderBody, createOrder);

export default orderRouter;
