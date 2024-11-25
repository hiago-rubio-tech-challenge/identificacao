import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CPF } from "../../entitites";

export const CadastroSChema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().custom(CPF.validateCPF).required(),
  password: Joi.string().required(),
});
