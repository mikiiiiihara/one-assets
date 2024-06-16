export type CreateJapanStockInput = {
  code: string;
  getPrice: number;
  quantity: number;
  sector: string;
  userId: string;
  cashId?: string;
  changedPrice?: number;
};

export type UpdateJapanStockInput = {
  id: string;
  getPrice: number;
  quantity: number;
  cashId?: string;
  changedPrice?: number;
};

export type DeleteJapanStockInput = {
  id: string;
  cashId?: string;
  changedPrice?: number;
};
