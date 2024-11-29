import axios from "axios";
import { LoginCliente, RegisterCliente } from "../entities";
import { ICreateCliente } from "../interfaces";

export interface IAwsLambdaService {
  registerCliente(newUser: ICreateCliente): Promise<any>;
  loginCliente(userCredentials: LoginCliente): Promise<any>;
}

export class AwsLambdaService implements IAwsLambdaService {
  constructor() {}

  private wireRegisterCliente(newUser: ICreateCliente): RegisterCliente {
    return {
      cpf: newUser.cpf,
      username: newUser.email,
      name: newUser.name,
      password: newUser.password,
    };
  }

  async registerCliente(newUser: ICreateCliente): Promise<any> {
    const url = `${process.env.AWS_LAMBDA_URL}/register`;
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const response = await axios.post(
        url,
        this.wireRegisterCliente(newUser),
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao registar cliente:", error);
    }
  }
  async loginCliente(userCredentials: LoginCliente): Promise<any> {
    const url = `${process.env.AWS_LAMBDA_URL}/login`;
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const response = await axios.post(url, userCredentials, config);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao autenticar cliente:", error);
    }
  }
}
