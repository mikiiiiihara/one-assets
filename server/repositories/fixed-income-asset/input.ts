export type CreateFixedIncomeAssetInput = {
  code: string;
  getPriceTotal: number;
  dividendRate: number;
  usdjpy: number;
  paymentMonth: number[];
  userId: string;
};

export type UpdateFixedIncomeAssetInput = {
  id: string;
  getPriceTotal: number;
  dividendRate: number;
  usdjpy: number;
  paymentMonth: number[];
};
