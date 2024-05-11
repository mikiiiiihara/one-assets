type CurrencyRate = {
  high: string;
  open: string;
  bid: string;
  currencyPairCode: string;
  ask: string;
  low: string;
};

type CurrencyRates = {
  quotes: CurrencyRate[];
};
