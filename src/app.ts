import "dotenv/config";

import { MongoClientWrapper } from "./db/MongoCliente";
import { expressStart, gracefulShutdown } from "./web/expressApp";

async function main() {
  try {
    console.log("Starting server");

    const mongoCliente = new MongoClientWrapper();

    await mongoCliente.connect();
    const db = mongoCliente.getDb();
    const app = await expressStart(Number(process.env.PORT ?? 3000), db);

    process.on("SIGINT", () => {
      gracefulShutdown(app);
      mongoCliente.close();
    });

    process.on("SIGTERM", () => {
      gracefulShutdown(app);
      mongoCliente.close();
    });

    console.log("Application started at port", process.env.PORT ?? 3000);
  } catch (error) {
    console.error("Application failed to started with error:", error);
    process.exit(1);
  }
}

main();
