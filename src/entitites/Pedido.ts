import { ObjectId } from "mongodb";
import { PedidosStatus } from "./PedidoStatus";

export class Pedido {
  constructor(
    public id: string,
    public client: {
      id: string;
      name: string;
    },
    public totalValue: number,
    public totalItens: number,
    public status: PedidosStatus,
    public products: {
      id: string;
      name: string;
      category: string;
      price: number;
    }[],
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: ObjectId
  ) {}
}
