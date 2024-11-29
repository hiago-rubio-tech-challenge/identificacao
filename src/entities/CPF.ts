import { cpf as cpfValidator } from "cpf-cnpj-validator";
import Joi from "joi";

export class CPF {
  constructor() {}

  static validateCPF(
    value: string,
    helpers: Joi.CustomHelpers
  ): string | Joi.ErrorReport {
    if (!cpfValidator.isValid(value)) {
      return helpers.error("any.invalid", { message: "CPF inválido" });
    }
    return value;
  }
}
