import * as PrismaClient from "@server/lib/prisma-client";
import { Create, Get, List } from "./us-stock.repository";
import * as UsStockAdapter from "@server/adapters/us-stock/us-stock.adapter";
import { UsStockModel } from "./us-stock.model";
import {
  UsStockDividend,
  UsStockMarketPrice,
} from "@server/adapters/us-stock/responses";

// モックのセットアップを行う
jest.mock("@server/lib/prisma-client", () => ({
  __esModule: true, // ESModuleとして扱うために必要
  default: {
    usStock: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@server/adapters/us-stock/us-stock.adapter", () => ({
  fetchUsStockPrices: jest.fn(), // 適切なデフォルト値を返すように設定
  fetchUsStockDividend: jest.fn(), // 適切なデフォルト値を返すように設定
}));

// TypeScriptで型を明示的にキャストする
const mockFindMany = PrismaClient.default.usStock
  .findMany as jest.MockedFunction<
  typeof PrismaClient.default.usStock.findMany
>;

const mockFindUnique = PrismaClient.default.usStock
  .findUnique as jest.MockedFunction<
  typeof PrismaClient.default.usStock.findUnique
>;
const mockFetchPrices =
  UsStockAdapter.fetchUsStockPrices as jest.MockedFunction<
    typeof UsStockAdapter.fetchUsStockPrices
  >;
const mockFetchDividends =
  UsStockAdapter.fetchUsStockDividend as jest.MockedFunction<
    typeof UsStockAdapter.fetchUsStockDividend
  >;

describe("UsStockRepository", () => {
  const currentDate = new Date();
  currentDate.setDate(15);
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth()).padStart(2, "0"); // 月は0から始まるので+1し、2桁にパディング
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 2);
  threeMonthsAgo.setDate(15);
  const threeMonthsAgoYear = threeMonthsAgo.getFullYear();
  const threeMonthsAgoMonth = String(threeMonthsAgo.getMonth() + 1).padStart(
    2,
    "0"
  );
  const threeMonthsAgoDay = String(threeMonthsAgo.getDate()).padStart(2, "0");
  // mock化
  const mockStocks = [
    {
      id: "1",
      code: "AAPL",
      getPrice: 150.0,
      quantity: 10,
      sector: "Technology",
      usdjpy: 110.0,
      isNoTax: false,
    },
  ];
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
  ];
  const code = "AAPL";
  const mockUsStockDividend: UsStockDividend = {
    symbol: code,
    historical: [
      {
        date: `${currentYear}-${currentMonth}-${currentDay}`,
        label: `${currentMonth} ${currentDay}, ${String(currentYear).slice(-2)}`,
        adjDividend: 0.85,
        dividend: 0.85,
        recordDate: `${currentYear}-${currentMonth}-${currentDay}`,
        paymentDate: `${currentYear}-${currentMonth}-${String(currentDate.getDate() + 2).padStart(2, "0")}`,
        declarationDate: `${currentYear}-${currentMonth}-${String(currentDate.getDate() - 7).padStart(2, "0")}`,
      },
      {
        date: `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${threeMonthsAgoDay}`,
        label: `${threeMonthsAgoMonth} ${threeMonthsAgoDay}, ${String(threeMonthsAgoYear).slice(-2)}`,
        adjDividend: 0.82,
        dividend: 0.82,
        recordDate: `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${String(threeMonthsAgo.getDate() + 2).padStart(2, "0")}`,
        paymentDate: `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${String(threeMonthsAgo.getDate() + 2).padStart(2, "0")}`,
        declarationDate: `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${String(threeMonthsAgo.getDate() - 2).padStart(2, "0")}`,
      },
    ],
  };
  // 期待値
  const expectedStock: UsStockModel = {
    id: "1",
    code: "AAPL",
    getPrice: 150.0,
    quantity: 10,
    sector: "Technology",
    usdjpy: 110.0,
    currentPrice: 150,
    currentRate: 1.5,
    priceGets: 2,
    isNoTax: false,
    dividends: [
      {
        fixedDate: new Date(`${currentYear}-${currentMonth}-${currentDay}`),
        paymentDate: new Date(
          `${currentYear}-${currentMonth}-${String(currentDate.getDate() + 2).padStart(2, "0")}`
        ),
        price: 0.85,
      },
      {
        fixedDate: new Date(
          `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${threeMonthsAgoDay}`
        ),
        paymentDate: new Date(
          `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${String(threeMonthsAgo.getDate() + 2).padStart(2, "0")}`
        ),
        price: 0.82,
      },
    ],
  };

  const expectedStocks = [expectedStock];

  describe("List", () => {
    beforeEach(() => {
      mockFindMany.mockReset();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a list of stocks for a user(isIncludedDividend = true)", async () => {
      mockFindMany.mockResolvedValue(mockStocks as any);
      mockFetchPrices.mockResolvedValue(mockUsStockMarketPrices);
      mockFetchDividends.mockResolvedValue(mockUsStockDividend);

      const result = await List("user1", true);
      expect(result).toEqual(expectedStocks);
    });

    it("should return a list of stocks for a user(isIncludedDividend = false)", async () => {
      mockFindMany.mockResolvedValue(mockStocks as any);
      mockFetchPrices.mockResolvedValue(mockUsStockMarketPrices);
      mockFetchDividends.mockResolvedValue(mockUsStockDividend);

      const result = await List("user1");
      expect(result).toEqual([{ ...expectedStock, dividends: [] }]);
    });

    it("should handle empty stock list", async () => {
      mockFindMany.mockResolvedValue([]);

      const result = await List("user2");
      expect(result).toEqual([]);
    });
  });

  describe("Get", () => {
    beforeEach(() => {
      mockFindUnique.mockReset();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return stock data if stock exists", async () => {
      const mockStock = mockStocks[0];

      mockFindUnique.mockResolvedValue(mockStock as any);
      mockFetchPrices.mockResolvedValue(mockUsStockMarketPrices);
      mockFetchDividends.mockResolvedValue(mockUsStockDividend);

      const result = await Get("1");
      expect(result).toEqual(expectedStock);
    });

    it("should throw an error if stock does not exist", async () => {
      mockFindUnique.mockResolvedValue(null);
      await expect(Get("999")).rejects.toThrow("Stock not found");
    });
  });

  describe("Create", () => {
    let mockCreate: jest.Mock;

    beforeAll(() => {
      mockCreate = PrismaClient.default.usStock.create as jest.Mock;
    });

    beforeEach(() => {
      mockCreate.mockReset();
    });

    it("should create a new stock record and return it", async () => {
      const mockStock = mockStocks[0];

      mockCreate.mockResolvedValue(mockStock);

      const result = await Create({
        code: "AAPL",
        getPrice: 150.0,
        quantity: 10,
        sector: "Technology",
        usdjpy: 110.0,
        userId: "user1",
        isNoTax: false,
      });
      
      // Create now returns without market data
      expect(result).toEqual({
        id: "1",
        code: "AAPL",
        getPrice: 150,
        quantity: 10,
        sector: "Technology",
        usdjpy: 110,
        isNoTax: false,
      });
    });
  });
});
