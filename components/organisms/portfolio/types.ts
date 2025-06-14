import { Dividend } from "@server/repositories/stock/us/us-stock.model";

export type Detail = {
  id: string;
  code: string;
  name: string;
  quantity: number;
  getPrice: number;
  price: number;
  priceGets: number;
  priceRate: number;
  dividend: Dividend[];
  sumOfDividend: number;
  dividendRate: number;
  sector: string;
  usdJpy: number;
  sumOfGetPrice: number;
  sumOfPrice: number;
  balance: number;
  balanceRate: number;
  group: string;
  isNoTax: boolean;
  // Optional properties for specific asset types
  getPriceTotal?: number; // For cash, japan funds, fixed income assets
  paymentMonth?: number[]; // For fixed income assets
};

export type AssetsSummary = {
  details: Detail[];
  getPriceTotal: number;
  priceTotal: number;
  dividendTotal: number;
};
