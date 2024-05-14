export type Detail = {
  id: string;
  code: string;
  name: string;
  quantity: number;
  getPrice: number;
  price: number;
  priceGets: number;
  priceRate: number;
  dividend: number;
  sumOfDividend: number;
  dividendRate: number;
  sector: string;
  usdJpy: number;
  sumOfGetPrice: number;
  sumOfPrice: number;
  balance: number;
  balanceRate: number;
};

export type AssetsSummary = {
  details: Detail[];
  getPriceTotal: number;
  priceTotal: number;
  dividendTotal: number;
};
