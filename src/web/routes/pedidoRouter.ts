import { Express, Router } from "express";
import { Db } from "mongodb";
import { PedidoController } from "../../controllers/PedidoController";
import { validateCheckout } from "../schemas";

export const pedidoRouter = (app: Express, db: Db) => {
  const pedidoController = new PedidoController(db);
  const router = Router();

  app.post(
    "/pedido/checkout",
    validateCheckout,
    pedidoController.checkout.bind(pedidoController)
  );
  app.get("/pedido", pedidoController.listPedidos.bind(pedidoController));
  app.get(
    "/pedido/:id/payment-status",
    pedidoController.getPaymentStatus.bind(pedidoController)
  );
  app.post(
    "/pedido/payment/webhook",
    pedidoController.paymentWebhook.bind(pedidoController)
  );

  app.use(router);
};

