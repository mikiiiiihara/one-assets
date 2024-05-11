type UsStockMarketPrice = {
  symbol: string; // ティッカー名
  name: string;
  price: number; // 現実価格
  changesPercentage: number; // 騰落率
  change: number; // 変化額
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
};

type UsStockDividend = {
  symbol: string;
  historical: UsStockDividendItem[];
};

type UsStockDividendItem = {
  date: string;
  label: string;
  adjDividend: number;
  dividend: number;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
};
