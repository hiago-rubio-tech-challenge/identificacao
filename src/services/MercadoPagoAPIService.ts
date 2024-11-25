import axios from "axios";
import { Pedido } from "../entitites";
import { mercadoPagoOrderWireOut } from "./wire.out/mercadoPagoOrderWireOut";

export interface IMercadoPagoApi {
  createPedido(pedido: Pedido): Promise<any>;
}

export class MercadoPagoAPI implements IMercadoPagoApi {
  constructor() {}

  async createPedido(pedido: Pedido): Promise<any> {
    const url =
      "https://api.mercadopago.com/instore/orders/qr/seller/collectors/1905489523/pos/SUC001POS002/qrs";
    const payload = mercadoPagoOrderWireOut(pedido);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await axios.post(url, payload, config);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating QR code order:", error);
    }
  }
}
