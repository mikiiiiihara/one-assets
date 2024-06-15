export type CreateUsStockInput = {
  code: string;
  getPrice: number;
  quantity: number;
  sector: string;
  usdjpy: number;
  userId: string;
  cashId?: string;
  changedPrice?: number;
};

export type UpdateUsStockInput = {
  id: string;
  getPrice: number;
  quantity: number;
  usdjpy: number;
  cashId?: string;
  changedPrice?: number;
};

export type DeleteUsStockInput = {
  id: string;
  cashId?: string;
  changedPrice?: number;
};
