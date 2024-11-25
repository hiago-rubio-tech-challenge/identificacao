import { Cliente } from "../entitites";
import { ClienteRepository } from "../gateways/ClienteRepository";
import { ICreateCliente } from "../interfaces";
import { AwsLambdaService } from "../services/AwsLambdaService";

export interface IIdentificacaoUseCase {
  createCliente(cadastro: ICreateCliente): Promise<Cliente | null>;
  identificacao(cpf: string): Promise<Cliente | null>;
  loginCliente(username: string, password: string): Promise<Cliente | null>;
}

export class IdentificacaoUseCase implements IIdentificacaoUseCase {
  constructor(
    private clienteRepository: ClienteRepository,
    private awsLambdaService: AwsLambdaService
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
}
