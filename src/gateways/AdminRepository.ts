import { Collection, Db, UpdateResult } from "mongodb";
import { Produto } from "../entitites/Produto";
import { COLLECTION_NAMES_ENUM } from "../enums";
import { ICreateProduto, IUpdateProduto } from "../interfaces";
import { randomUUID } from "crypto";
import { ProdutoCategories } from "../entitites/ProdutoCategories";

export interface IAdminRepository {
  findProdutoByCategory(category: ProdutoCategories): Promise<Produto[] | null>;
  createProduto(produto: ICreateProduto): Promise<Produto>;
  updateProduto(produto: IUpdateProduto): Promise<Produto | null>;
  deleteProduto(id: string): Promise<Boolean>;
}

export class AdminRepository implements IAdminRepository {
  private collection: Collection<Produto>;

  constructor(db: Db) {
    this.collection = db.collection<Produto>(COLLECTION_NAMES_ENUM.products);
  }

  async findProdutoByCategory(category: ProdutoCategories) {
    return await this.collection
      .find({ category, deleted: { $ne: false } })
      .toArray();
  }

  async createProduto(produto: ICreateProduto) {
    const result = await this.collection.insertOne({
      ...produto,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newProduct = await this.collection.findOne<Produto>({
      _id: result.insertedId,
    });
    if (!newProduct) throw new Error("Inclusão de produto falhou!");
    return newProduct;
  }

  async updateProduto(produto: IUpdateProduto) {
    const updatedProduct = {
      ...produto,
      updatedAt: new Date(),
    };

    const result = await this.collection.findOneAndUpdate(
      { id: produto.id },
      {
        $set: updatedProduct,
      },
      { returnDocument: "after" }
    );

    return result;
  }

  async deleteProduto(id: string) {
    const result = await this.collection.updateOne(
      { id: id },
      {
        $set: {
          deleted: true,
          deletedAt: new Date(),
        },
      }
    );

    return result.acknowledged;
  }
}
