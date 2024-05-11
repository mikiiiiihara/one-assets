import { Dividend } from "@server/repositories/stock/us/us-stock.model";

export type Asset = {
  code: string;
  currentPrice: number;
  currentRate: number;
  dividends: Dividend[];
  getPrice: number;
  getPriceTotal: number;
  id: number;
  priceGets: number;
  quantity: number;
  sector: string;
  usdJpy: number;
  group: string;
};
