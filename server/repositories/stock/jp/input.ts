export type CreateJapanStockInput = {
  code: string;
  name: string;
  getPrice: number;
  quantity: number;
  dividends: number;
  sector: string;
  isNoTax: boolean;
  userId: string;
  cashId?: string;
  changedPrice?: number;
};

export type UpdateJapanStockInput = {
  id: string;
  name: string;
  getPrice: number;
  quantity: number;
  dividends: number;
  cashId?: string;
  changedPrice?: number;
};

export type DeleteJapanStockInput = {
  id: string;
  cashId?: string;
  changedPrice?: number;
};
