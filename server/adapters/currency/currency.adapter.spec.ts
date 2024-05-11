import { fetchCurrencyRates } from "./currency.adapter";

// `axiosClient`のモックを事前に宣言
const mockGet = jest.fn();

jest.mock("@server/lib/axios.client", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
}));

describe("fetchCurrencyRates", () => {
  const mockCurrencyRates: CurrencyRates = {
    quotes: [
      {
        high: "1.9539",
        open: "1.9519",
        bid: "1.9535",
        currencyPairCode: "GBPNZD",
        ask: "1.9581",
        low: "1.9509",
      },
      {
        high: "97.46",
        open: "97.44",
        bid: "97.40",
        currencyPairCode: "CADJPY",
        ask: "97.49",
        low: "97.30",
      },
      {
        high: "1.8190",
        open: "1.8172",
        bid: "1.8179",
        currencyPairCode: "GBPAUD",
        ask: "1.8210",
        low: "1.8169",
      },
      {
        high: "89.00",
        open: "88.99",
        bid: "88.94",
        currencyPairCode: "AUDJPY",
        ask: "89.05",
        low: "88.93",
      },
      {
        high: "1.0747",
        open: "1.0736",
        bid: "1.0743",
        currencyPairCode: "AUDNZD",
        ask: "1.0756",
        low: "1.0728",
      },
      {
        high: "1.4556",
        open: "1.4553",
        bid: "1.4553",
        currencyPairCode: "EURCAD",
        ask: "1.4567",
        low: "1.4544",
      },
      {
        high: "1.0610",
        open: "1.0607",
        bid: "1.0609",
        currencyPairCode: "EURUSD",
        ask: "1.0612",
        low: "1.0605",
      },
      {
        high: "82.87",
        open: "82.83",
        bid: "82.70",
        currencyPairCode: "NZDJPY",
        ask: "82.85",
        low: "82.54",
      },
      {
        high: "1.3721",
        open: "1.3718",
        bid: "1.3718",
        currencyPairCode: "USDCAD",
        ask: "1.3724",
        low: "1.3712",
      },
      {
        high: "0.8763",
        open: "0.8760",
        bid: "0.8759",
        currencyPairCode: "EURGBP",
        ask: "0.8765",
        low: "0.8755",
      },
      {
        high: "1.2108",
        open: "1.2093",
        bid: "1.2105",
        currencyPairCode: "GBPUSD",
        ask: "1.2115",
        low: "1.2091",
      },
      {
        high: "7.199",
        open: "7.195",
        bid: "7.190",
        currencyPairCode: "ZARJPY",
        ask: "7.340",
        low: "7.189",
      },
      {
        high: "0.9859",
        open: "0.9859",
        bid: "0.9858",
        currencyPairCode: "EURCHF",
        ask: "0.9868",
        low: "0.9855",
      },
      {
        high: "143.88",
        open: "143.88",
        bid: "143.68",
        currencyPairCode: "CHFJPY",
        ask: "143.90",
        low: "143.66",
      },
      {
        high: "0.6656",
        open: "0.6654",
        bid: "0.6654",
        currencyPairCode: "AUDUSD",
        ask: "0.6658",
        low: "0.6650",
      },
      {
        high: "0.9293",
        open: "0.9291",
        bid: "0.9293",
        currencyPairCode: "USDCHF",
        ask: "0.9303",
        low: "0.9290",
      },
      {
        high: "141.90",
        open: "141.84",
        bid: "141.83",
        currencyPairCode: "EURJPY",
        ask: "141.92",
        low: "141.83",
      },
      {
        high: "1.1250",
        open: "1.1240",
        bid: "1.1245",
        currencyPairCode: "GBPCHF",
        ask: "1.1275",
        low: "1.1232",
      },
      {
        high: "1.7134",
        open: "1.7117",
        bid: "1.7123",
        currencyPairCode: "EURNZD",
        ask: "1.7156",
        low: "1.7107",
      },
      {
        high: "0.6194",
        open: "0.6193",
        bid: "0.6186",
        currencyPairCode: "NZDUSD",
        ask: "0.6195",
        low: "0.6177",
      },
      {
        high: "133.74",
        open: "133.73",
        bid: "133.69",
        currencyPairCode: "USDJPY",
        ask: "133.72",
        low: "133.69",
      },
      {
        high: "1.5938",
        open: "1.5936",
        bid: "1.5936",
        currencyPairCode: "EURAUD",
        ask: "1.5949",
        low: "1.5923",
      },
      {
        high: "0.6186",
        open: "0.6182",
        bid: "0.6184",
        currencyPairCode: "AUDCHF",
        ask: "0.6196",
        low: "0.6180",
      },
      {
        high: "161.94",
        open: "161.77",
        bid: "161.81",
        currencyPairCode: "GBPJPY",
        ask: "162.04",
        low: "161.72",
      },
    ],
  };
  beforeEach(() => {
    // 各テストの前にモックの返す値を設定
    mockGet.mockResolvedValue({
      data: mockCurrencyRates,
    });
  });

  afterEach(() => {
    // 各テストの後にモックの呼び出し状況をクリア
    mockGet.mockReset();
  });

  it("fetches currency rates successfully", async () => {
    const data = await fetchCurrencyRates();
    expect(data).toEqual(mockCurrencyRates.quotes);
  });
});
