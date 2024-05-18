export type CreateUsStockInput = {
  code: string;
  getPrice: number;
  quantity: number;
  sector: string;
  usdjpy: number;
  userId: string;
};

export type UpdateUsStockInput = {
  id: string;
  getPrice: number;
  quantity: number;
  usdjpy: number;
};
