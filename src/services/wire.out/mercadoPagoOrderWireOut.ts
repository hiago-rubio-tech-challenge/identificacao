import { Pedido, Produto } from "../../entitites";
import {
  MercadoPagoOrder,
  MercadoPagoOrderItens,
} from "../interfaces/mercadoPagoOrder";

interface PedidoProduto {
  id: string;
  name: string;
  category: string;
  price: number;
}

const calcTotalAmount = (products: PedidoProduto[]): number => {
  return products.reduce((acc, product) => acc + product.price, 0);
};

const wireProducts = (products: PedidoProduto[]): MercadoPagoOrderItens[] => {
  return products.map((product) => ({
    sku_number: product.id,
    category: product.category,
    title: product.name,
    unit_price: product.price,
    quantity: 1,
    total_amount: product.price,
    unit_measure: "unit",
  }));
};

export const mercadoPagoOrderWireOut = (pedido: Pedido): MercadoPagoOrder => {
  return {
    cash_out: {
      amount: 0,
    },
    description: `Pedido id: ${pedido.id} do cliente ${pedido.client.name}`,
    external_reference: String(pedido._id),
    items: wireProducts(pedido.products),
    notification_url:
      "https://0b6e-179-198-30-227.ngrok-free.app/pedido/payment/webhook",
    title: `Pedido id: ${pedido.id}`,
    total_amount: calcTotalAmount(pedido.products),
  };
};
