import { Pedido, PedidosStatus } from "../entitites";
import { IPedidoRepository } from "../gateways";
import { ICheckoutBody } from "../interfaces";
import { MercadoPagoAPI } from "../services/MercadoPagoAPIService";

export interface IPedidoUseCase {
  checkout(body: ICheckoutBody): Promise<Pedido>;
  listPedidos(status: PedidosStatus): Promise<Pedido[] | null>;
  checkPaymentAndUpdateStatus(pedidoId: string): Promise<Pedido | null>;
}

export class PedidoUseCase implements IPedidoUseCase {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private mercadoPagoAPI: MercadoPagoAPI
  ) {}

  async checkout(body: ICheckoutBody): Promise<Pedido> {
    const pedido = await this.pedidoRepository.checkout(body);
    await this.mercadoPagoAPI.createPedido(pedido);
    return pedido;
  }

  async listPedidos(status: PedidosStatus): Promise<Pedido[] | null> {
    const pedidos = this.pedidoRepository.listPedidos({ status });
    return pedidos;
  }

  async checkPaymentAndUpdateStatus(pedidoId: string): Promise<Pedido | null> {
    const updatedPedido = await this.pedidoRepository.updatePedidoStatus(
      pedidoId,
      PedidosStatus.EM_PREPARO
    );
    return updatedPedido;
  }
}
