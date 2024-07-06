import { MOCK_JAPAN_STOCK_MARKET_PRICES } from "./mock-data";
import { JapanChartResponse, JapanStockPrice } from "./response";
import { fetchJapanStockPrices } from "./stock.adapter";

// `axiosClient`のモックを事前に宣言
const mockGet = jest.fn();

jest.mock("@server/lib/axios.client", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
}));

describe("fetchJapanStockPrices", () => {
  beforeEach(() => {
    // 各テストの前にモックの返す値を設定
    mockGet.mockResolvedValue({
      data: MOCK_JAPAN_STOCK_MARKET_PRICES,
    });
  });

  afterEach(() => {
    // 各テストの後にモックの呼び出し状況をクリア
    mockGet.mockReset();
  });

  it("fetches japan stock prices successfully", async () => {
    const code = "8002";
    const response = await fetchJapanStockPrices(code);
    const expected: JapanStockPrice = {
      code: "8002.T",
      previousClosePrice: 3127,
      price: 3100,
    };
    expect(response).toEqual(expected);
  });
});
