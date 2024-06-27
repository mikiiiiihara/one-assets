import * as UsStockRepository from "@server/repositories/stock/us/us-stock.repository";
import * as JapanStockRepository from "@server/repositories/stock/jp/japan-stock.repository";
import * as JapanFundRepository from "@server/repositories/japan-fund/japan-fund.repository";
import * as FixedIncomeAssetRepository from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import * as CashRepository from "@server/repositories/cash/cash.repository";
import * as CryptoRepository from "@server/repositories/crypto/crypto.repository";
import { buildDividendOfFixedIncomeAsset, buildDividendOfJapanStock } from ".";
import { getAssets } from "./asset.service";

jest.mock("@server/repositories/stock/us/us-stock.repository");
jest.mock("@server/repositories/stock/jp/japan-stock.repository");
jest.mock("@server/repositories/japan-fund/japan-fund.repository");
jest.mock(
  "@server/repositories/fixed-income-asset/fixed-income-asset.repository"
);
jest.mock("@server/repositories/cash/cash.repository");
jest.mock("@server/repositories/crypto/crypto.repository");
jest.mock(".", () => ({
  ...jest.requireActual("."),
  buildDividendOfFixedIncomeAsset: jest.fn(),
  buildDividendOfJapanStock: jest.fn(),
}));

describe("getAssets", () => {
  const userId = "test-user";

  const mockUsStocks = [
    {
      id: "us1",
      code: "AAPL",
      currentPrice: 150,
      currentRate: 1.5,
      dividends: [],
      getPrice: 100,
      quantity: 10,
      sector: "Technology",
      usdjpy: 110,
      priceGets: [],
      isNoTax: false,
    },
  ];

  const mockJapanStocks = [
    {
      id: "jp1",
      code: "7203",
      name: "Toyota",
      currentPrice: 8000,
      getPrice: 6000,
      quantity: 5,
      sector: "Automotive",
      dividends: [],
      isNoTax: false,
    },
  ];

  const mockJapanFunds = [
    {
      id: "jf1",
      code: "fund1",
      name: "Japan Fund",
      currentPrice: 10000,
      getPrice: 9000,
      getPriceTotal: 9000,
    },
  ];

  const mockCryptos = [
    {
      id: "crypto1",
      code: "BTC",
      currentPrice: 4000000,
      getPrice: 3000000,
      quantity: 0.5,
    },
  ];

  const mockFixedIncomeAssets = [
    {
      id: "fixed1",
      code: "bond1",
      getPriceTotal: 100000,
      usdjpy: 110,
    },
  ];

  const mockCashes = [
    {
      id: "cash1",
      name: "USD",
      price: 1000,
      sector: "cash",
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of assets for the user", async () => {
    (UsStockRepository.List as jest.Mock).mockResolvedValue(mockUsStocks);
    (JapanStockRepository.List as jest.Mock).mockResolvedValue(mockJapanStocks);
    (JapanFundRepository.List as jest.Mock).mockResolvedValue(mockJapanFunds);
    (CryptoRepository.List as jest.Mock).mockResolvedValue(mockCryptos);
    (FixedIncomeAssetRepository.List as jest.Mock).mockResolvedValue(
      mockFixedIncomeAssets
    );
    (CashRepository.List as jest.Mock).mockResolvedValue(mockCashes);
    (buildDividendOfFixedIncomeAsset as jest.Mock).mockReturnValue([]);
    (buildDividendOfJapanStock as jest.Mock).mockReturnValue([]);

    const result = await getAssets(userId);

    expect(result).toEqual([
      {
        code: "AAPL",
        name: "AAPL",
        currentPrice: 150,
        currentRate: 1.5,
        dividends: [],
        getPrice: 100,
        getPriceTotal: 1000,
        id: "us1",
        priceGets: [],
        quantity: 10,
        sector: "Technology",
        usdJpy: 110,
        group: "usStock",
        isNoTax: false,
      },
      {
        code: "7203",
        name: "Toyota",
        currentPrice: 8000,
        currentRate: 0,
        dividends: [],
        getPrice: 6000,
        getPriceTotal: 30000,
        id: "jp1",
        priceGets: 0,
        quantity: 5,
        sector: "Automotive",
        usdJpy: 1,
        group: "japanStock",
        isNoTax: false,
      },
      {
        code: "fund1",
        name: "Japan Fund",
        currentPrice: 10000,
        currentRate: 0,
        dividends: [],
        getPrice: 9000,
        getPriceTotal: 9000,
        id: "jf1",
        priceGets: 0,
        quantity: 0,
        sector: "japanFund",
        usdJpy: 0,
        group: "japanFund",
        isNoTax: false,
      },
      {
        code: "BTC",
        name: "BTC",
        currentPrice: 4000000,
        currentRate: 0,
        dividends: [],
        getPrice: 3000000,
        getPriceTotal: 1500000,
        id: "crypto1",
        priceGets: 0,
        quantity: 0.5,
        sector: "crypto",
        usdJpy: 1,
        group: "crypto",
        isNoTax: false,
      },
      {
        code: "bond1",
        name: "bond1",
        currentPrice: 0,
        currentRate: 0,
        dividends: [],
        getPrice: 0,
        getPriceTotal: 100000,
        id: "fixed1",
        priceGets: 0,
        quantity: 1,
        sector: "fixedIncomeAsset",
        usdJpy: 110,
        group: "fixedIncomeAsset",
        isNoTax: false,
      },
      {
        code: "USD",
        name: "USD",
        currentPrice: 0,
        currentRate: 0,
        dividends: [],
        getPrice: 0,
        getPriceTotal: 1000,
        id: "cash1",
        priceGets: 0,
        quantity: 1,
        sector: "cash",
        usdJpy: 1,
        group: "cash",
        isNoTax: false,
      },
    ]);
  });
});
