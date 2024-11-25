import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import swaggerJson from "./swagger.json";

export function swaggerSetup(app: Express): void {
  const options = {
    explorer: true,
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson, options));
}
