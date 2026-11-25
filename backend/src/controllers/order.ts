import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body as { total: number; items: string[] };

  try {
    const products = await Product.find({ _id: { $in: items } });
    const productsById = new Map(products.map((product) => [String(product._id), product]));
    const prices = items.map((id) => {
      const product = productsById.get(id.toLowerCase());
      if (!product) {
        throw new BadRequestError(`Товар с id ${id} не найден`);
      }
      if (product.price == null) {
        throw new BadRequestError(`Товар с id ${id} не продаётся`);
      }
      return product.price;
    });
    const calculatedTotal = prices.reduce((sum, price) => sum + price, 0);

    if (calculatedTotal !== total) {
      throw new BadRequestError('Неверная сумма заказа');
    }

    return res.send({ id: randomUUID(), total: calculatedTotal });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
