export type CreateCryptoInput = {
  code: string;
  getPrice: number;
  quantity: number;
  userId: string;
};

export type UpdateCryptoInput = {
  id: string;
  getPrice: number;
  quantity: number;
};
