import { Produto } from "../entitites/Produto";
import { ProdutoCategories } from "../entitites/ProdutoCategories";
import { IAdminRepository } from "../gateways/AdminRepository";
import { ICreateProduto, IUpdateProduto } from "../interfaces";

export class AdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async findProdutoByCategory(
    category: ProdutoCategories
  ): Promise<Produto[] | null> {
    return this.adminRepository.findProdutoByCategory(category);
  }

  async createProduto(produto: ICreateProduto): Promise<Produto> {
    return this.adminRepository.createProduto(produto);
  }

  async updateProduto(produto: IUpdateProduto): Promise<Produto | null> {
    return this.adminRepository.updateProduto(produto);
  }

  async deleteProduto(id: string): Promise<Boolean> {
    return this.adminRepository.deleteProduto(id);
  }
}
