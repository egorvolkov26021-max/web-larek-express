import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';
import { validateProductBody } from '../middlewares/validation';

const productRouter = Router();

productRouter.get('/product', getProduct);

productRouter.post(
  '/product',

  validateProductBody,
  createProduct,
);

export default productRouter;
