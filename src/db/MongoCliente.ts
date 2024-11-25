import { MongoClient, Db } from "mongodb";

export class MongoClientWrapper {
  private static instance: MongoClientWrapper;
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    console.log("process.env.MONGO_URL", process.env.MONGO_URL);
    this.client = new MongoClient(
      process.env.MONGO_URL || "mongodb://localhost:27017"
    );
  }

  public static getInstance(): MongoClientWrapper {
    if (!MongoClientWrapper.instance) {
      MongoClientWrapper.instance = new MongoClientWrapper();
    }
    return MongoClientWrapper.instance;
  }

  public async connect(): Promise<void> {
    if (!this.db) {
      console.log("Attempting to connect to MongoDB server...");
      await this.client.connect();
      console.log("Connected successfully to MongoDB server");
      this.db = this.client.db("mydatabase");
    }
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error("Database connection is not established yet");
    }
    return this.db;
  }

  public async close(): Promise<void> {
    console.log("Attempting to disconnect from MongoDB server...");
    await this.client.close();
    this.db = null;
    console.log("Disconnected from MongoDB server");
  }
}
