import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { CPF } from "../../entitites";

export interface IdentificacaoSchema {
  cpf: string;
}

export const identificacaoSchema = Joi.object({
  cpf: Joi.string().custom(CPF.validateCPF).required(),
});

export function validateIdentificacao(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = identificacaoSchema.validate(body);
  if (error) {
    res
      .status(400)
      .send("Não foi possível consultar o cpf. Error: Dados inválidos.");
  } else {
    next();
  }
}
