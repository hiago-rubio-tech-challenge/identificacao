import {
  Cliente,
  RegisterCliente,
  LoginCliente,
} from "../../../src/entities/Cliente";
import { CPF } from "../../../src/entities/CPF";
import { Email } from "../../../src/entities/Email";

describe("Cliente", () => {
  it("should create a Cliente instance", () => {
    const cpf = "123.456.789-00";
    const email = new Email("test@example.com");
    const cliente = new Cliente(
      "1",
      "1",
      email,
      cpf,
      "John Doe",
      new Date(),
      new Date()
    );

    expect(cliente).toBeInstanceOf(Cliente);
    expect(cliente._id).toBe("1");
    expect(cliente.id).toBe("1");
    expect(cliente.email).toBe(email);
    expect(cliente.cpf).toBe(cpf);
    expect(cliente.name).toBe("John Doe");
    expect(cliente.createdAt).toBeInstanceOf(Date);
    expect(cliente.updatedAt).toBeInstanceOf(Date);
  });
});

describe("RegisterCliente", () => {
  it("should create a RegisterCliente instance", () => {
    const registerCliente = new RegisterCliente(
      "John Doe",
      "123.456.789-00",
      "johndoe",
      "password123"
    );

    expect(registerCliente).toBeInstanceOf(RegisterCliente);
    expect(registerCliente.name).toBe("John Doe");
    expect(registerCliente.cpf).toBe("123.456.789-00");
    expect(registerCliente.username).toBe("johndoe");
    expect(registerCliente.password).toBe("password123");
  });
});

describe("LoginCliente", () => {
  it("should create a LoginCliente instance", () => {
    const loginCliente = new LoginCliente("johndoe", "password123");

    expect(loginCliente).toBeInstanceOf(LoginCliente);
    expect(loginCliente.username).toBe("johndoe");
    expect(loginCliente.password).toBe("password123");
  });
});
