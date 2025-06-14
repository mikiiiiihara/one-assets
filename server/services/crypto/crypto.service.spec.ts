import { createCrypto, updateCrypto, deleteCrypto } from "./crypto.service";
import * as CryptoRepository from "@server/repositories/crypto/crypto.repository";
import { CryptoModel } from "@server/repositories/crypto/crypto.model";

// モックのセットアップ
jest.mock("@server/repositories/crypto/crypto.repository", () => ({
  Create: jest.fn(),
  Update: jest.fn(),
  Delete: jest.fn(),
}));

const mockCreate = CryptoRepository.Create as jest.MockedFunction<
  typeof CryptoRepository.Create
>;

const mockUpdate = CryptoRepository.Update as jest.MockedFunction<
  typeof CryptoRepository.Update
>;

const mockDelete = CryptoRepository.Delete as jest.MockedFunction<
  typeof CryptoRepository.Delete
>;

describe("CryptoService", () => {
  const mockCrypto: CryptoModel = {
    id: "1",
    code: "BTC",
    getPrice: 50000,
    quantity: 0.5,
    currentPrice: 55000,
  };

  beforeEach(() => {
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCrypto", () => {
    it("should create a new crypto and return it", async () => {
      mockCreate.mockResolvedValue(mockCrypto);

      const input = {
        code: "BTC",
        getPrice: 50000,
        quantity: 0.5,
        userId: "user1",
      };

      const result = await createCrypto(input);

      expect(result).toEqual(mockCrypto);
      expect(mockCreate).toHaveBeenCalledWith(input);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Repository error");
      mockCreate.mockRejectedValue(error);

      const input = {
        code: "BTC",
        getPrice: 50000,
        quantity: 0.5,
        userId: "user1",
      };

      await expect(createCrypto(input)).rejects.toThrow("Repository error");
    });
  });

  describe("updateCrypto", () => {
    it("should update a crypto and return it", async () => {
      const updatedCrypto = {
        ...mockCrypto,
        getPrice: 52000,
        quantity: 0.7,
      };

      mockUpdate.mockResolvedValue(updatedCrypto);

      const input = {
        id: "1",
        getPrice: 52000,
        quantity: 0.7,
      };

      const result = await updateCrypto(input);

      expect(result).toEqual(updatedCrypto);
      expect(mockUpdate).toHaveBeenCalledWith(input);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Crypto not found");
      mockUpdate.mockRejectedValue(error);

      const input = {
        id: "999",
        getPrice: 52000,
        quantity: 0.7,
      };

      await expect(updateCrypto(input)).rejects.toThrow("Crypto not found");
    });
  });

  describe("deleteCrypto", () => {
    it("should delete a crypto and return it", async () => {
      const deletedCrypto = {
        ...mockCrypto,
        currentPrice: 0,
      };

      mockDelete.mockResolvedValue(deletedCrypto);

      const result = await deleteCrypto("1");

      expect(result).toEqual(deletedCrypto);
      expect(mockDelete).toHaveBeenCalledWith("1");
    });

    it("should handle repository errors", async () => {
      const error = new Error("Crypto not found");
      mockDelete.mockRejectedValue(error);

      await expect(deleteCrypto("999")).rejects.toThrow("Crypto not found");
    });
  });
});