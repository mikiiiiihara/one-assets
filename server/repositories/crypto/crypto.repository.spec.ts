import * as PrismaClient from "@server/lib/prisma-client";
import { Create, Get, Update, Delete, List } from "./crypto.repository";
import * as CryptoPriceAdapter from "@server/adapters/crypto-price/crypto-price.adapter";
import { CryptoModel } from "./crypto.model";

// モックのセットアップを行う
jest.mock("@server/lib/prisma-client", () => ({
  __esModule: true,
  default: {
    crypto: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("@server/adapters/crypto-price/crypto-price.adapter", () => ({
  fetchCryptoPrice: jest.fn(),
}));

// TypeScriptで型を明示的にキャストする
const mockFindMany = PrismaClient.default.crypto.findMany as jest.MockedFunction<
  typeof PrismaClient.default.crypto.findMany
>;

const mockFindUnique = PrismaClient.default.crypto.findUnique as jest.MockedFunction<
  typeof PrismaClient.default.crypto.findUnique
>;

const mockCreate = PrismaClient.default.crypto.create as jest.MockedFunction<
  typeof PrismaClient.default.crypto.create
>;

const mockUpdate = PrismaClient.default.crypto.update as jest.MockedFunction<
  typeof PrismaClient.default.crypto.update
>;

const mockDelete = PrismaClient.default.crypto.delete as jest.MockedFunction<
  typeof PrismaClient.default.crypto.delete
>;

const mockFetchCryptoPrice = CryptoPriceAdapter.fetchCryptoPrice as jest.MockedFunction<
  typeof CryptoPriceAdapter.fetchCryptoPrice
>;

describe("CryptoRepository", () => {
  const mockCrypto = {
    id: "1",
    code: "BTC",
    getPrice: 50000,
    quantity: 0.5,
  };

  const mockCryptoPrice = {
    data: {
      last: "55000.00",
    },
  };

  const expectedCrypto: CryptoModel = {
    id: "1",
    code: "BTC",
    getPrice: 50000,
    quantity: 0.5,
    currentPrice: 55000,
  };

  beforeEach(() => {
    mockFindMany.mockReset();
    mockFindUnique.mockReset();
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
    mockFetchCryptoPrice.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("List", () => {
    it("should return a list of cryptos for a user", async () => {
      mockFindMany.mockResolvedValue([mockCrypto] as any);
      mockFetchCryptoPrice.mockResolvedValue(mockCryptoPrice as any);

      const result = await List("user1");
      expect(result).toEqual([expectedCrypto]);
    });

    it("should handle empty crypto list", async () => {
      mockFindMany.mockResolvedValue([]);

      const result = await List("user2");
      expect(result).toEqual([]);
    });
  });

  describe("Get", () => {
    it("should return crypto data if crypto exists", async () => {
      mockFindUnique.mockResolvedValue(mockCrypto as any);
      mockFetchCryptoPrice.mockResolvedValue(mockCryptoPrice as any);

      const result = await Get("1");
      expect(result).toEqual(expectedCrypto);
    });

    it("should throw an error if crypto does not exist", async () => {
      mockFindUnique.mockResolvedValue(null);
      await expect(Get("999")).rejects.toThrow("Crypto not found");
    });
  });

  describe("Create", () => {
    it("should create a new crypto record and return it", async () => {
      mockCreate.mockResolvedValue(mockCrypto as any);
      mockFetchCryptoPrice.mockResolvedValue(mockCryptoPrice as any);

      const result = await Create({
        code: "BTC",
        getPrice: 50000,
        quantity: 0.5,
        userId: "user1",
      });

      expect(result).toEqual(expectedCrypto);
    });
  });

  describe("Update", () => {
    it("should update a crypto record and return it", async () => {
      const updatedMockCrypto = {
        ...mockCrypto,
        getPrice: 52000,
        quantity: 0.7,
      };

      const expectedUpdatedCrypto = {
        ...expectedCrypto,
        getPrice: 52000,
        quantity: 0.7,
      };

      mockUpdate.mockResolvedValue(updatedMockCrypto as any);
      mockFetchCryptoPrice.mockResolvedValue(mockCryptoPrice as any);

      const result = await Update({
        id: "1",
        getPrice: 52000,
        quantity: 0.7,
      });

      expect(result).toEqual(expectedUpdatedCrypto);
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: "1" },
        data: {
          getPrice: 52000,
          quantity: 0.7,
        },
        select: {
          id: true,
          code: true,
          getPrice: true,
          quantity: true,
        },
      });
    });
  });

  describe("Delete", () => {
    it("should delete a crypto record and return it", async () => {
      const expectedDeletedCrypto = {
        ...mockCrypto,
        currentPrice: 0,
      };

      mockDelete.mockResolvedValue(mockCrypto as any);

      const result = await Delete("1");

      expect(result).toEqual(expectedDeletedCrypto);
      expect(mockDelete).toHaveBeenCalledWith({
        where: { id: "1" },
        select: {
          id: true,
          code: true,
          getPrice: true,
          quantity: true,
        },
      });
    });
  });
});