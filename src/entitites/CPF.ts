import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class CPF {
  private readonly value: string;

  constructor(value: string) {
    if (!CPF.validateCPF(value)) {
      throw new Error("Invalid CPF");
    }
    this.value = value;
  }

  static validateCPF(cpf: string): boolean {
    return cpfValidator.isValid(cpf);
  }

  toString(): string {
    return this.value;
  }
}
