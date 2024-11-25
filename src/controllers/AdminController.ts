import { Request, Response } from "express";
import { Db } from "mongodb";
import { ProdutoCategories } from "../entitites/ProdutoCategories";
import { AdminRepository } from "../gateways";
import { ICreateProduto, IUpdateProduto } from "../interfaces";
import { AdminUseCase } from "../usecases";

export class AdminController {
  private adminUseCase: AdminUseCase;

  constructor(db: Db) {
    this.adminUseCase = new AdminUseCase(new AdminRepository(db));
  }

  async getProdutosByCategory(req: Request, res: Response) {
    const { category } = req.params;
    if (!Object.values(ProdutoCategories).find((cat) => cat === category)) {
      res.status(500).send({ error: "Categoria inválida" });
    }
    try {
      const produtos = await this.adminUseCase.findProdutoByCategory(
        category as ProdutoCategories
      );
      if (produtos && produtos.length) {
        res.status(200).send(produtos);
      } else {
        res.status(404).send({ error: "Nenhum produto encontrado." });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async createProduto(req: Request, res: Response) {
    try {
      const produto: ICreateProduto = req.body;
      const product = await this.adminUseCase.createProduto(produto);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async updateProduto(req: Request, res: Response) {
    try {
      const body: IUpdateProduto = req.body;
      const produto = await this.adminUseCase.updateProduto(body);
      res.status(200).send(produto);
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async deleteProduto(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const produto = await this.adminUseCase.deleteProduto(id);
      res.status(200).send(produto);
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}
