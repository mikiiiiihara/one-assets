import { fetchUsStockDividend, fetchUsStockPrices } from "./us-stock.adapter";

// `axiosClient`のモックを事前に宣言
const mockGet = jest.fn();

jest.mock("@server/lib/axios.client", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
}));

describe("fetchUsStockPrices", () => {
  const mockUsStockMarketPrices: UsStockMarketPrice[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 150,
      changesPercentage: 1.5,
      change: 2,
      dayLow: 148,
      dayHigh: 152,
      yearHigh: 180,
      yearLow: 120,
      marketCap: 2000000000,
      priceAvg50: 145,
      priceAvg200: 135,
      exchange: "NASDAQ",
      volume: 1000000,
      avgVolume: 800000,
      open: 149,
      previousClose: 148,
      eps: 3.2,
      pe: 25,
      earningsAnnouncement: "2021-10-28T00:00:00.000Z",
      sharesOutstanding: 5000000000,
      timestamp: 1616953200,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 250,
      changesPercentage: 1.0,
      change: 2.5,
      dayLow: 245,
      dayHigh: 255,
      yearHigh: 300,
      yearLow: 220,
      marketCap: 1500000000,
      priceAvg50: 240,
      priceAvg200: 230,
      exchange: "NASDAQ",
      volume: 1200000,
      avgVolume: 1000000,
      open: 248,
      previousClose: 246,
      eps: 5.0,
      pe: 30,
      earningsAnnouncement: "2021-10-27T00:00:00.000Z",
      sharesOutstanding: 4000000000,
      timestamp: 1616866800,
    },
  ];

  beforeEach(() => {
    // 各テストの前にモックの返す値を設定
    mockGet.mockResolvedValue({
      data: mockUsStockMarketPrices,
    });
  });

  afterEach(() => {
    // 各テストの後にモックの呼び出し状況をクリア
    mockGet.mockReset();
  });

  it("fetches us stock prices successfully", async () => {
    const codes = ["AAPL", "MSFT"];
    const data = await fetchUsStockPrices(codes);
    expect(data).toEqual(mockUsStockMarketPrices);
  });
});

describe("fetchUsStockDividend", () => {
  const code = "AAPL";
  const mockUsStockDividend: UsStockDividend = {
    symbol: code,
    historical: [
      {
        date: "2022-05-07",
        label: "May 07, 22",
        adjDividend: 0.85,
        dividend: 0.85,
        recordDate: "2022-05-09",
        paymentDate: "2022-05-15",
        declarationDate: "2022-04-30",
      },
      {
        date: "2022-02-05",
        label: "Feb 05, 22",
        adjDividend: 0.82,
        dividend: 0.82,
        recordDate: "2022-02-07",
        paymentDate: "2022-02-13",
        declarationDate: "2022-01-29",
      },
    ],
  };
  it("fetches stock dividends successfully", async () => {
    mockGet.mockResolvedValueOnce({ data: mockUsStockDividend });
    const data = await fetchUsStockDividend(code);
    expect(data).toEqual(mockUsStockDividend);
  });

  it("handles rate limit exceeded and retries with a different token", async () => {
    // First call with rate limit error
    mockGet.mockRejectedValueOnce({ response: { status: 429 } });
    // Retry call with successful response
    mockGet.mockResolvedValueOnce({ data: mockUsStockDividend });

    const data = await fetchUsStockDividend(code);
    expect(data).toEqual(mockUsStockDividend);
  });
});
