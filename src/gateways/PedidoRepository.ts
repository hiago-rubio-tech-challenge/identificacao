import { Collection, Db, Filter, ObjectId } from "mongodb";
import { Pedido, PedidosStatus } from "../entitites";
import { ICheckoutBody } from "../interfaces";
import { COLLECTION_NAMES_ENUM } from "../enums";
import { randomUUID } from "crypto";

export interface IPedidoRepository {
  checkout(body: ICheckoutBody): Promise<Pedido>;
  listPedidos(filter: Filter<Pedido>): Promise<Pedido[] | null>;
  updatePedidoStatus(p: string, s: PedidosStatus): Promise<Pedido | null>;
  findPedidoById(pedidoId: string): Promise<Pedido | null>;
}

export class PedidoRepository implements IPedidoRepository {
  private collection: Collection<Pedido>;

  constructor(private db: Db) {
    this.collection = this.db.collection<Pedido>(COLLECTION_NAMES_ENUM.pedidos);
  }
  async updatePedidoStatus(
    pedidoId: string,
    status: PedidosStatus
  ): Promise<Pedido | null> {
    const pedido = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(pedidoId) },
      { $set: { status: status } },
      { returnDocument: "after" }
    );
    return pedido;
  }

  async checkout(pedido: ICheckoutBody): Promise<Pedido> {
    const result = await this.collection.insertOne({
      ...pedido,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: PedidosStatus.RECEBIDO,
      client: {
        name: pedido.client.name,
        id: pedido.client.id,
      },
    });

    const newPedido = await this.collection.findOne<Pedido>({
      _id: result.insertedId,
    });
    if (!newPedido) throw new Error("Inclusão de pedido falhou!");
    return newPedido;
  }
  async listPedidos(filter: Filter<Pedido>): Promise<Pedido[] | null> {
    const newPedido = await this.collection.find({ ...filter });

    if (!newPedido) throw new Error("Não foi possivel encontrar o pedido");
    return newPedido.toArray();
  }
  async findPedidoById(pedidoId: string): Promise<Pedido | null> {
    const pedido = await this.collection.findOne<Pedido>({
      _id: new ObjectId(pedidoId),
    });

    if (!pedido) throw new Error("Não foi possivel encontrar o pedido");
    return pedido;
  }
}
