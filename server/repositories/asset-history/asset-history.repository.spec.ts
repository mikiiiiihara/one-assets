import prismaClient from "@server/lib/prisma-client";
import { AssetHistoryModel } from "./asset-history.model";
import { List } from "./asset-history.repository";

jest.mock("@server/lib/prisma-client", () => ({
  __esModule: true,
  default: {
    assetHistory: {
      findMany: jest.fn(),
    },
  },
}));

const mockFindMany = prismaClient.assetHistory.findMany as jest.MockedFunction<
  typeof prismaClient.assetHistory.findMany
>;

describe("AssetHistoryRepository", () => {
  const userId = "test-user";
  const mockAssetHistories: AssetHistoryModel[] = [
    {
      id: "1",
      stock: 100,
      fund: 200,
      fixedIncomeAsset: 300,
      crypto: 400,
      cash: 500,
      createdAt: new Date("2022-01-01T00:00:00Z"),
    },
    {
      id: "2",
      stock: 110,
      fund: 210,
      fixedIncomeAsset: 310,
      crypto: 410,
      cash: 510,
      createdAt: new Date("2022-01-02T00:00:00Z"),
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("List", () => {
    it("should return asset history without optional parameters", async () => {
      mockFindMany.mockResolvedValue(mockAssetHistories as any);

      const result = await List(userId);

      expect(result).toEqual(mockAssetHistories);
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId },
        select: {
          id: true,
          stock: true,
          fund: true,
          crypto: true,
          fixedIncomeAsset: true,
          cash: true,
          createdAt: true,
        },
        take: undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should return asset history with day parameter", async () => {
      const day = 30;
      mockFindMany.mockResolvedValue(mockAssetHistories as any);

      const result = await List(userId, day);

      expect(result).toEqual(mockAssetHistories);
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId },
        select: {
          id: true,
          stock: true,
          fund: true,
          crypto: true,
          fixedIncomeAsset: true,
          cash: true,
          createdAt: true,
        },
        take: day,
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should return asset history with startDate parameter", async () => {
      const startDate = new Date("2022-01-01T00:00:00Z");
      const utcStartDate = new Date(startDate.toISOString());
      mockFindMany.mockResolvedValue(mockAssetHistories as any);

      const result = await List(userId, undefined, startDate);

      expect(result).toEqual(mockAssetHistories);
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId, createdAt: { gte: utcStartDate } },
        select: {
          id: true,
          stock: true,
          fund: true,
          crypto: true,
          fixedIncomeAsset: true,
          cash: true,
          createdAt: true,
        },
        take: undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should return asset history with endDate parameter", async () => {
      const endDate = new Date("2022-12-31T23:59:59Z");
      const utcEndDate = new Date(endDate.toISOString());
      mockFindMany.mockResolvedValue(mockAssetHistories as any);

      const result = await List(userId, undefined, undefined, endDate);

      expect(result).toEqual(mockAssetHistories);
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId, createdAt: { lte: utcEndDate } },
        select: {
          id: true,
          stock: true,
          fund: true,
          crypto: true,
          fixedIncomeAsset: true,
          cash: true,
          createdAt: true,
        },
        take: undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should return asset history with all parameters", async () => {
      const day = 30;
      const startDate = new Date("2022-01-01T00:00:00Z");
      const utcStartDate = new Date(startDate.toISOString());
      const endDate = new Date("2022-12-31T23:59:59Z");
      const utcEndDate = new Date(endDate.toISOString());
      mockFindMany.mockResolvedValue(mockAssetHistories as any);

      const result = await List(userId, day, startDate, endDate);

      expect(result).toEqual(mockAssetHistories);
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId, createdAt: { gte: utcStartDate, lte: utcEndDate } },
        select: {
          id: true,
          stock: true,
          fund: true,
          crypto: true,
          fixedIncomeAsset: true,
          cash: true,
          createdAt: true,
        },
        take: day,
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should handle empty asset history list", async () => {
      mockFindMany.mockResolvedValue([]);

      const result = await List(userId);

      expect(result).toEqual([]);
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId },
        select: {
          id: true,
          stock: true,
          fund: true,
          crypto: true,
          fixedIncomeAsset: true,
          cash: true,
          createdAt: true,
        },
        take: undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    });
  });
});
