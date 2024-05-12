export type CryptoPrice = {
  success: number;
  data: {
    sell: string;
    buy: string;
    open: string;
    high: string;
    low: string;
    last: string;
    vol: string;
    timestamp: number;
  };
};
