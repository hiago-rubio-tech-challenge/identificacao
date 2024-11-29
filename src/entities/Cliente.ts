import { CPF } from "./CPF";
import { Email } from "./Email";

export class Cliente {
  constructor(
    public readonly _id: string,
    public id: string,
    public email: Email,
    public cpf: CPF,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

export class RegisterCliente {
  constructor(
    public name: string,
    public cpf: string,
    public username: string,
    public password: string
  ) {}
}

export class LoginCliente {
  constructor(public username: string, public password: string) {}
}
