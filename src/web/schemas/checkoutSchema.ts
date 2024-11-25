import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export interface CheckoutBody {
  client: {
    id: string;
    name: string;
  };
  products: {
    id: string;
    name: string;
    category: string;
    price: number;
  }[];
  totalValue: number;
  totalItens: number;
}

const checkoutSchema = Joi.object({
  client: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }).required(),
  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
      }).required()
    )
    .required(),
  totalValue: Joi.number().required(),
  totalItens: Joi.number().required(),
});

export function validateCheckout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = checkoutSchema.validate(body);
  if (error) {
    res
      .status(400)
      .send(
        "Não foi possível atualizar cadastrar o pedido. Error: Dados inválidos."
      );
  } else {
    next();
  }
}
