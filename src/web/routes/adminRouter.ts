import { Express, Router } from "express";
import { Db } from "mongodb";
import { AdminController } from "../../controllers/AdminController";
import {
  validateCreateProduto,
  validateDeleteProduto,
  validateUpdateProduto,
} from "../schemas";

export const adminRouter = (app: Express, db: Db) => {
  const adminController = new AdminController(db);
  const router = Router();
  app.get(
    "/admin/products/:category",
    adminController.getProdutosByCategory.bind(adminController)
  );
  app.patch(
    "/admin/products",
    validateUpdateProduto,
    adminController.updateProduto.bind(adminController)
  );
  app.delete(
    "/admin/products",
    validateDeleteProduto,
    adminController.deleteProduto.bind(adminController)
  );
  app.post(
    "/admin/products",
    validateCreateProduto,
    adminController.createProduto.bind(adminController)
  );
  app.use(router);
};
