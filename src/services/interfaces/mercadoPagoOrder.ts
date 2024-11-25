export interface MercadoPagoOrderItens {
  sku_number: string;
  category: string;
  title: string;
  unit_price: number;
  quantity: number;
  total_amount: number;
}

export interface MercadoPagoOrder {
  cash_out: {
    amount: number;
  };
  description: string;
  external_reference: string;
  items: MercadoPagoOrderItens[];
  notification_url: string;
  title: string;
  total_amount: number;
}
