import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';

export const getProduct = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    return res.send({ items: products, total: products.length });
  } catch (err) {
    return next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  try {
    const product = await Product.create({
      title, image, category, description, price,
    });
    return res.send(product);
  } catch (err) {
    return next(err);
  }
};
