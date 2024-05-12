import { fetchCryptoPrice } from "./crypto-price.adapter";
import { CryptoPrice } from "./response";

// `axiosClient`のモックを事前に宣言
const mockGet = jest.fn();

jest.mock("@server/lib/axios.client", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
}));

describe("fetchCryptoPrice", () => {
  const mockCryptoPrice: CryptoPrice = {
    success: 1,
    data: {
      sell: "50.750",
      buy: "50.749",
      open: "50.706",
      high: "50.917",
      low: "49.333",
      last: "50.749",
      vol: "13346627.3932",
      timestamp: 1679376127932,
    },
  };
  beforeEach(() => {
    // 各テストの前にモックの返す値を設定
    mockGet.mockResolvedValue({
      data: mockCryptoPrice,
    });
  });

  afterEach(() => {
    // 各テストの後にモックの呼び出し状況をクリア
    mockGet.mockReset();
  });

  it("fetches crypto price successfully", async () => {
    const data = await fetchCryptoPrice("xrp");
    expect(data).toEqual(mockCryptoPrice);
  });
});
