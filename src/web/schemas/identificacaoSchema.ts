import Joi from "joi";
import { CPF } from "../../entities";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export interface IdentificacaoSchema {
  cpf: string;
}

function validateCPF(cpf: string): boolean {
  return cpfValidator.isValid(cpf);
}

export const IdentificacaoSchema = Joi.object({
  cpf: Joi.string().custom(CPF.validateCPF).required(),
});
