export interface ICheckoutBody {
  client: {
    id: string;
    name: string;
  };
  products: {
    id: string;
    name: string;
    category: string;
    price: number;
  }[];
  totalValue: number;
  totalItens: number;
}
