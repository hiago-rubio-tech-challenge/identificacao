import {
  ClienteRepository,
  IClienteRepository,
} from "../../../src/gateways/ClienteRepository";
import { ICreateCliente } from "../../../src/interfaces";
import { IAwsLambdaService } from "../../../src/services/AwsLambdaService";
import { IdentificacaoUseCase } from "../../../src/usecases/IdentificacaoUseCase";

describe("IdentificacaoUseCase", () => {
  let usecase: IdentificacaoUseCase;
  let repository: IClienteRepository = {
    consultaClienteCpfMongo: jest.fn(),
    cadastroClienteMongo: jest.fn(),
  };
  let lambda: IAwsLambdaService = {
    loginCliente: jest.fn().mockReturnValue({ foo: "bar" }),
    registerCliente: jest.fn(),
  };

  beforeEach(() => {
    usecase = new IdentificacaoUseCase(repository, lambda);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("identificacao", () => {
    it("should return a client", async () => {
      const mockRepository = {
        consultaClienteCpfMongo: jest.fn().mockReturnValue({ foo: "bar" }),
        cadastroClienteMongo: jest.fn(),
      };
      const mockusecase = new IdentificacaoUseCase(mockRepository, lambda);
      const result = await mockusecase.identificacao("11952312612");
      expect(result).not.toBeNull();
      expect(mockRepository.consultaClienteCpfMongo).toHaveBeenCalledWith(
        "11952312612"
      );
      expect(mockRepository.consultaClienteCpfMongo).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if client is not found", async () => {
      const mockRepository = {
        consultaClienteCpfMongo: jest.fn().mockReturnValue(null),
        cadastroClienteMongo: jest.fn(),
      };
      const mockusecase = new IdentificacaoUseCase(mockRepository, lambda);
      await expect(mockusecase.identificacao("11952312612")).rejects.toThrow(
        "Cliente não encontrado."
      );
    });
  });

  describe("loginCliente", () => {
    it("should login a client", async () => {
      const result = await usecase.loginCliente("11952312612", "AAAAAAAA");
      expect(result).not.toBeNull();
      expect(lambda.loginCliente).toHaveBeenCalledWith({
        username: "11952312612",
        password: "AAAAAAAA",
      });
      expect(lambda.loginCliente).toHaveBeenCalledTimes(1);
    });
  });

  describe("createCliente", () => {
    it("should create a new client", async () => {
      const cadastro: ICreateCliente = {
        cpf: "11952312612",
        name: "Teste",
        email: "a@a.com",
        password: "123456",
      };

      const result = await usecase.createCliente(cadastro);

      expect(result).not.toBeNull();
      expect(repository.cadastroClienteMongo).toHaveBeenCalledWith(cadastro);
      expect(repository.consultaClienteCpfMongo).toHaveBeenCalledWith(
        cadastro.cpf
      );
      expect(lambda.registerCliente).toHaveBeenCalledWith(cadastro);
      expect(repository.cadastroClienteMongo).toHaveBeenCalledTimes(1);
      expect(repository.consultaClienteCpfMongo).toHaveBeenCalledTimes(1);
      expect(lambda.registerCliente).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if client is already registered", async () => {
      const mockRepository = {
        consultaClienteCpfMongo: jest.fn().mockReturnValue({ foo: "bar" }),
        cadastroClienteMongo: jest.fn(),
      };
      const mockusecase = new IdentificacaoUseCase(mockRepository, lambda);
      await expect(
        mockusecase.createCliente({
          cpf: "11952312612",
          name: "Teste",
          email: "a@a.com",
          password: "123456",
        })
      ).rejects.toThrow("Cliente já cadastrado.");
    });
  });

  describe("validateCadastroSchema", () => {
    it("should return true if schema is valid", () => {
      const cadastro: ICreateCliente = {
        cpf: "11952312612",
        name: "Teste",
        email: "a@a.com",
        password: "123456",
      };

      const result = usecase.validateCadastroSchema(cadastro);

      expect(result).toBe(true);
    });

    it("should return false if schema is invalid", () => {
      expect(
        usecase.validateCadastroSchema({
          cpf: "AAAAAAAAAA",
          name: "Teste",
          email: "",
          password: "123456",
        })
      ).toBe(false);
    });
  });

  describe("validateIdentificacaoSchema", () => {
    it("should return true if schema is valid", () => {
      const identificacao = {
        cpf: "11952312612",
      };

      const result = usecase.validateIdentificacaoSchema(identificacao);

      expect(result).toBe(true);
    });

    it("should return false if schema is invalid", () => {
      expect(
        usecase.validateIdentificacaoSchema({
          cpf: "AAAAAAAAAA",
        })
      ).toBe(false);

      expect(
        usecase.validateIdentificacaoSchema({
          cpf: "123456789",
        })
      ).toBe(false);

      expect(
        usecase.validateIdentificacaoSchema({
          cpf: "1234567891011",
        })
      ).toBe(false);

      expect(
        usecase.validateIdentificacaoSchema({
          cpf: "9999999999",
        })
      ).toBe(false);
    });
  });
});
