import { 
  createFixedIncomeAsset, 
  updateFixedIncomeAsset, 
  deleteFixedIncomeAsset 
} from "./fixed-income-asset.service";
import * as FixedIncomeAssetRepository from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";

// モックのセットアップ
jest.mock("@server/repositories/fixed-income-asset/fixed-income-asset.repository", () => ({
  Create: jest.fn(),
  Update: jest.fn(),
  Delete: jest.fn(),
}));

const mockCreate = FixedIncomeAssetRepository.Create as jest.MockedFunction<
  typeof FixedIncomeAssetRepository.Create
>;

const mockUpdate = FixedIncomeAssetRepository.Update as jest.MockedFunction<
  typeof FixedIncomeAssetRepository.Update
>;

const mockDelete = FixedIncomeAssetRepository.Delete as jest.MockedFunction<
  typeof FixedIncomeAssetRepository.Delete
>;

describe("FixedIncomeAssetService", () => {
  const mockAsset: FixedIncomeAssetModel = {
    id: "1",
    code: "US10Y",
    getPriceTotal: 10000,
    dividendRate: 4.5,
    usdjpy: 150,
    paymentMonth: [3, 6, 9, 12],
  };

  beforeEach(() => {
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createFixedIncomeAsset", () => {
    it("should create a new fixed income asset and return it", async () => {
      mockCreate.mockResolvedValue(mockAsset);

      const input = {
        code: "US10Y",
        getPriceTotal: 10000,
        dividendRate: 4.5,
        usdjpy: 150,
        paymentMonth: [3, 6, 9, 12],
        userId: "user1",
      };

      const result = await createFixedIncomeAsset(input);

      expect(result).toEqual(mockAsset);
      expect(mockCreate).toHaveBeenCalledWith(input);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Repository error");
      mockCreate.mockRejectedValue(error);

      const input = {
        code: "US10Y",
        getPriceTotal: 10000,
        dividendRate: 4.5,
        usdjpy: 150,
        paymentMonth: [3, 6, 9, 12],
        userId: "user1",
      };

      await expect(createFixedIncomeAsset(input)).rejects.toThrow("Repository error");
    });
  });

  describe("updateFixedIncomeAsset", () => {
    it("should update a fixed income asset and return it", async () => {
      const updatedAsset = {
        ...mockAsset,
        getPriceTotal: 12000,
        dividendRate: 5.0,
        usdjpy: 155,
        paymentMonth: [6, 12],
      };

      mockUpdate.mockResolvedValue(updatedAsset);

      const input = {
        id: "1",
        getPriceTotal: 12000,
        dividendRate: 5.0,
        usdjpy: 155,
        paymentMonth: [6, 12],
      };

      const result = await updateFixedIncomeAsset(input);

      expect(result).toEqual(updatedAsset);
      expect(mockUpdate).toHaveBeenCalledWith(input);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Fixed income asset not found");
      mockUpdate.mockRejectedValue(error);

      const input = {
        id: "999",
        getPriceTotal: 12000,
        dividendRate: 5.0,
        usdjpy: 155,
        paymentMonth: [6, 12],
      };

      await expect(updateFixedIncomeAsset(input)).rejects.toThrow("Fixed income asset not found");
    });
  });

  describe("deleteFixedIncomeAsset", () => {
    it("should delete a fixed income asset and return it", async () => {
      mockDelete.mockResolvedValue(mockAsset);

      const result = await deleteFixedIncomeAsset("1");

      expect(result).toEqual(mockAsset);
      expect(mockDelete).toHaveBeenCalledWith("1");
    });

    it("should handle repository errors", async () => {
      const error = new Error("Fixed income asset not found");
      mockDelete.mockRejectedValue(error);

      await expect(deleteFixedIncomeAsset("999")).rejects.toThrow("Fixed income asset not found");
    });
  });
});