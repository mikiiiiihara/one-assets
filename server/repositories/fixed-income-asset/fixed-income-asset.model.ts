export type FixedIncomeAssetModel = {
  id: string;
  code: string;
  getPriceTotal: number;
  dividendRate: number;
  usdjpy: number;
  paymentMonth: number[];
};
