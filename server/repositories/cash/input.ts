export type CreateCashInput = {
  name: string;
  price: number;
  sector: string;
  userId: string;
};

export type UpdateCashInput = {
  id: string;
  price: number;
};
