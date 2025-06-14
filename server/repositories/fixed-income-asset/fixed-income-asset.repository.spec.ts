import * as PrismaClient from "@server/lib/prisma-client";
import { Create, Get, Update, Delete, List } from "./fixed-income-asset.repository";
import { FixedIncomeAssetModel } from "./fixed-income-asset.model";

// モックのセットアップを行う
jest.mock("@server/lib/prisma-client", () => ({
  __esModule: true,
  default: {
    fixedIncomeAsset: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// TypeScriptで型を明示的にキャストする
const mockFindMany = PrismaClient.default.fixedIncomeAsset.findMany as jest.MockedFunction<
  typeof PrismaClient.default.fixedIncomeAsset.findMany
>;

const mockFindUnique = PrismaClient.default.fixedIncomeAsset.findUnique as jest.MockedFunction<
  typeof PrismaClient.default.fixedIncomeAsset.findUnique
>;

const mockCreate = PrismaClient.default.fixedIncomeAsset.create as jest.MockedFunction<
  typeof PrismaClient.default.fixedIncomeAsset.create
>;

const mockUpdate = PrismaClient.default.fixedIncomeAsset.update as jest.MockedFunction<
  typeof PrismaClient.default.fixedIncomeAsset.update
>;

const mockDelete = PrismaClient.default.fixedIncomeAsset.delete as jest.MockedFunction<
  typeof PrismaClient.default.fixedIncomeAsset.delete
>;

describe("FixedIncomeAssetRepository", () => {
  const mockAsset = {
    id: "1",
    code: "US10Y",
    getPriceTotal: 10000,
    dividendRate: 4.5,
    usdjpy: 150,
    paymentMonth: [3, 6, 9, 12],
  };

  const expectedAsset: FixedIncomeAssetModel = {
    id: "1",
    code: "US10Y",
    getPriceTotal: 10000,
    dividendRate: 4.5,
    usdjpy: 150,
    paymentMonth: [3, 6, 9, 12],
  };

  beforeEach(() => {
    mockFindMany.mockReset();
    mockFindUnique.mockReset();
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("List", () => {
    it("should return a list of fixed income assets for a user", async () => {
      mockFindMany.mockResolvedValue([mockAsset] as any);

      const result = await List("user1");
      expect(result).toEqual([expectedAsset]);
    });

    it("should handle empty asset list", async () => {
      mockFindMany.mockResolvedValue([]);

      const result = await List("user2");
      expect(result).toEqual([]);
    });
  });

  describe("Get", () => {
    it("should return asset data if asset exists", async () => {
      mockFindUnique.mockResolvedValue(mockAsset as any);

      const result = await Get("1");
      expect(result).toEqual(expectedAsset);
    });

    it("should throw an error if asset does not exist", async () => {
      mockFindUnique.mockResolvedValue(null);
      await expect(Get("999")).rejects.toThrow("Fixed income asset not found");
    });
  });

  describe("Create", () => {
    it("should create a new fixed income asset record and return it", async () => {
      mockCreate.mockResolvedValue(mockAsset as any);

      const result = await Create({
        code: "US10Y",
        getPriceTotal: 10000,
        dividendRate: 4.5,
        usdjpy: 150,
        paymentMonth: [3, 6, 9, 12],
        userId: "user1",
      });

      expect(result).toEqual(expectedAsset);
    });
  });

  describe("Update", () => {
    it("should update a fixed income asset record and return it", async () => {
      const updatedMockAsset = {
        ...mockAsset,
        getPriceTotal: 12000,
        dividendRate: 5.0,
        usdjpy: 155,
        paymentMonth: [6, 12],
      };

      const expectedUpdatedAsset = {
        ...expectedAsset,
        getPriceTotal: 12000,
        dividendRate: 5.0,
        usdjpy: 155,
        paymentMonth: [6, 12],
      };

      mockUpdate.mockResolvedValue(updatedMockAsset as any);

      const result = await Update({
        id: "1",
        getPriceTotal: 12000,
        dividendRate: 5.0,
        usdjpy: 155,
        paymentMonth: [6, 12],
      });

      expect(result).toEqual(expectedUpdatedAsset);
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: "1" },
        data: {
          getPriceTotal: 12000,
          dividendRate: 5.0,
          usdjpy: 155,
          paymentMonth: [6, 12],
        },
        select: {
          id: true,
          code: true,
          getPriceTotal: true,
          dividendRate: true,
          usdjpy: true,
          paymentMonth: true,
        },
      });
    });
  });

  describe("Delete", () => {
    it("should delete a fixed income asset record and return it", async () => {
      mockDelete.mockResolvedValue(mockAsset as any);

      const result = await Delete("1");

      expect(result).toEqual(expectedAsset);
      expect(mockDelete).toHaveBeenCalledWith({
        where: { id: "1" },
        select: {
          id: true,
          code: true,
          getPriceTotal: true,
          dividendRate: true,
          usdjpy: true,
          paymentMonth: true,
        },
      });
    });
  });
});