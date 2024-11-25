import { Cliente } from "../entitites";
import {
  ClienteRepository,
  IClienteRepository,
} from "../gateways/ClienteRepository";
import { ICreateCliente, IIdentificacao } from "../interfaces";
import {
  AwsLambdaService,
  IAwsLambdaService,
} from "../services/AwsLambdaService";
import { CadastroSChema, IdentificacaoSchema } from "../web/schemas";

export interface IIdentificacaoUseCase {
  createCliente(cadastro: ICreateCliente): Promise<Cliente | null>;
  identificacao(cpf: string): Promise<Cliente | null>;
  loginCliente(username: string, password: string): Promise<Cliente | null>;
}

export class IdentificacaoUseCase implements IIdentificacaoUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
    private awsLambdaService: IAwsLambdaService
  ) {}
  async loginCliente(
    username: string,
    password: string
  ): Promise<Cliente | null> {
    return this.awsLambdaService.loginCliente({ username, password });
  }

  async createCliente(cadastro: ICreateCliente): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.consultaClienteCpfMongo(
      cadastro.cpf
    );

    await this.awsLambdaService.registerCliente(cadastro);

    if (cliente) {
      throw new Error("Cliente já cadastrado.");
    }

    return this.clienteRepository.cadastroClienteMongo(cadastro);
  }

  async identificacao(cpf: string): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.consultaClienteCpfMongo(cpf);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return cliente;
  }

  validateCadastroSchema(cadastro: ICreateCliente): boolean {
    const { error } = CadastroSChema.validate(cadastro);
    return error ? false : true;
  }

  validateIdentificacaoSchema(identificacao: IIdentificacao): boolean {
    const { error } = IdentificacaoSchema.validate(identificacao);
    return error ? false : true;
  }
}
