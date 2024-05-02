import * as PrismaClient from "@server/lib/prisma-client";
import { Create, Get, List } from "./us-stock.repository";

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
// TypeScriptで型を明示的にキャストする
const mockFindMany = PrismaClient.default.usStock
  .findMany as jest.MockedFunction<
  typeof PrismaClient.default.usStock.findMany
>;

const mockFindUnique = PrismaClient.default.usStock
  .findUnique as jest.MockedFunction<
  typeof PrismaClient.default.usStock.findUnique
>;
describe("UsStockRepository", () => {
  describe("List", () => {
    beforeEach(() => {
      mockFindMany.mockReset();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a list of stocks for a user", async () => {
      const mockStocks = [
        {
          id: "1",
          code: "AAPL",
          getPrice: 150.0,
          quantity: 10,
          sector: "Technology",
          usdjpy: 110.0,
          userId: "user1",
          createdAt: new Date(), // Date型
          updatedAt: new Date(), // Date型
        },
      ];

      mockFindMany.mockResolvedValue(mockStocks);

      const result = await List("user1");
      expect(result).toEqual(mockStocks);
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
      const mockStock = {
        id: "1",
        code: "AAPL",
        getPrice: 150.0,
        quantity: 10,
        sector: "Technology",
        usdjpy: 110.0,
        userId: "user1",
        createdAt: new Date(), // Date型
        updatedAt: new Date(), // Date型
      };

      mockFindUnique.mockResolvedValue(mockStock);

      const result = await Get("1");
      expect(result).toEqual(mockStock);
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
      const mockStock = {
        id: "2",
        code: "TSLA",
        getPrice: 700.0,
        quantity: 5,
        sector: "Automotive",
        usdjpy: 110.0,
        userId: "user1",
      };

      mockCreate.mockResolvedValue(mockStock);

      const result = await Create({
        code: "TSLA",
        getPrice: 700.0,
        quantity: 5,
        sector: "Automotive",
        usdjpy: 110.0,
        userId: "user1",
      });
      expect(result).toEqual(mockStock);
    });
  });
});
