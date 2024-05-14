import { Dividend } from "@server/repositories/stock/us/us-stock.model";

export type Asset = {
  code: string;
  name: string;
  currentPrice: number;
  currentRate: number;
  dividends: Dividend[];
  getPrice: number;
  getPriceTotal: number;
  id: string;
  priceGets: number;
  quantity: number;
  sector: string;
  usdJpy: number;
  group: string;
};
