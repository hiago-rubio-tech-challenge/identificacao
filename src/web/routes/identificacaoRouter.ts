import { Express, Router } from "express";
import { Db } from "mongodb";
import { ClienteController } from "../../controllers/ClienteController";

export const identificacaoRouter = (app: Express, db: Db) => {
  const clienteController = new ClienteController(db);
  const router = Router();
  router.post(
    "/identificacao",
    clienteController.identificacao.bind(clienteController)
  );
  router.post(
    "/cadastro",
    clienteController.createCliente.bind(clienteController)
  );
  router.post("/login", clienteController.login.bind(clienteController));
  app.use(router);
};
