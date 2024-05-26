export type CreateJapanFundInput = {
  name: string;
  code: string;
  getPriceTotal: number;
  getPrice: number;
  userId: string;
};

export type UpdateJapanFundInput = {
  id: string;
  name: string;
  code: string;
  getPriceTotal: number;
  getPrice: number;
};
