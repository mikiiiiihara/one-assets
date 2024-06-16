import * as UserRepository from "@server/repositories/user/user.repository";
import * as UsStockRepository from "@server/repositories/stock/us/us-stock.repository";
import * as JapanStockRepository from "@server/repositories/stock/jp/japan-stock.repository";
import * as JapanFundRepository from "@server/repositories/japan-fund/japan-fund.repository";
import * as FixedIncomeAssetRepository from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import * as CashRepository from "@server/repositories/cash/cash.repository";
import * as CryptoRepository from "@server/repositories/crypto/crypto.repository";
import * as AssetHistoryRepository from "@server/repositories/asset-history/asset-history.repository";
import * as CurrencyAdapter from "@server/adapters/currency/currency.adapter";
import {
  AssetCreatedResponse,
  AssetHistoryList,
  CreateAssetHistory,
} from "./asset-history.service";
import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";

jest.mock("@server/repositories/user/user.repository");
jest.mock("@server/repositories/stock/us/us-stock.repository");
jest.mock("@server/repositories/stock/jp/japan-stock.repository");
jest.mock("@server/repositories/japan-fund/japan-fund.repository");
jest.mock(
  "@server/repositories/fixed-income-asset/fixed-income-asset.repository"
);
jest.mock("@server/repositories/cash/cash.repository");
jest.mock("@server/repositories/crypto/crypto.repository");
jest.mock("@server/repositories/asset-history/asset-history.repository");
jest.mock("@server/adapters/currency/currency.adapter");

describe("AssetHistoryService", () => {
  describe("AssetHistoryList", () => {
    const userId = "test-user";
    const mockAssetHistory: AssetHistoryModel[] = [
      {
        id: "1",
        stock: 100,
        fund: 200,
        fixedIncomeAsset: 300,
        crypto: 400,
        cash: 500,
        createdAt: new Date(),
      },
    ];

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should return asset history without optional parameters", async () => {
      (AssetHistoryRepository.List as jest.Mock).mockResolvedValue(
        mockAssetHistory
      );

      const result = await AssetHistoryList(userId);

      expect(result).toEqual(mockAssetHistory);
      expect(AssetHistoryRepository.List).toHaveBeenCalledWith(
        userId,
        undefined,
        undefined,
        undefined
      );
    });

    it("should return asset history with day parameter", async () => {
      const day = 30;
      (AssetHistoryRepository.List as jest.Mock).mockResolvedValue(
        mockAssetHistory
      );

      const result = await AssetHistoryList(userId, day);

      expect(result).toEqual(mockAssetHistory);
      expect(AssetHistoryRepository.List).toHaveBeenCalledWith(
        userId,
        day,
        undefined,
        undefined
      );
    });

    it("should return asset history with startDate parameter", async () => {
      const startDate = new Date("2022-01-01T00:00:00Z");
      const utcStartDate = new Date(startDate.toISOString());
      (AssetHistoryRepository.List as jest.Mock).mockResolvedValue(
        mockAssetHistory
      );

      const result = await AssetHistoryList(userId, undefined, startDate);

      expect(result).toEqual(mockAssetHistory);
      expect(AssetHistoryRepository.List).toHaveBeenCalledWith(
        userId,
        undefined,
        utcStartDate,
        undefined
      );
    });

    it("should return asset history with endDate parameter", async () => {
      const endDate = new Date("2022-12-31T23:59:59Z");
      const utcEndDate = new Date(endDate.toISOString());
      (AssetHistoryRepository.List as jest.Mock).mockResolvedValue(
        mockAssetHistory
      );

      const result = await AssetHistoryList(
        userId,
        undefined,
        undefined,
        endDate
      );

      expect(result).toEqual(mockAssetHistory);
      expect(AssetHistoryRepository.List).toHaveBeenCalledWith(
        userId,
        undefined,
        undefined,
        utcEndDate
      );
    });

    it("should return asset history with all parameters", async () => {
      const day = 30;
      const startDate = new Date("2022-01-01T00:00:00Z");
      const utcStartDate = new Date(startDate.toISOString());
      const endDate = new Date("2022-12-31T23:59:59Z");
      const utcEndDate = new Date(endDate.toISOString());
      (AssetHistoryRepository.List as jest.Mock).mockResolvedValue(
        mockAssetHistory
      );

      const result = await AssetHistoryList(userId, day, startDate, endDate);

      expect(result).toEqual(mockAssetHistory);
      expect(AssetHistoryRepository.List).toHaveBeenCalledWith(
        userId,
        day,
        utcStartDate,
        utcEndDate
      );
    });
  });

  describe("CreateAssetHistory", () => {
    const mockUserIds = ["user1", "user2"];
    const mockCurrencyRates = [{ currencyPairCode: "USDJPY", bid: "110.00" }];

    const mockUsStocks = [{ currentPrice: 150, quantity: 10 }];
    const mockJapanStocks = [{ currentPrice: 8000, quantity: 5 }];
    const mockJapanFunds = [
      { getPriceTotal: 9000, currentPrice: 10000, getPrice: 9000 },
    ];
    const mockFixedIncomeAssets = [{ getPriceTotal: 100000 }];
    const mockCryptos = [{ currentPrice: 4000000, quantity: 0.5 }];
    const mockCashes = [
      { price: 1000, sector: "USD" },
      { price: 1000, sector: "JPY" },
    ];

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should create asset history for all users", async () => {
      (UserRepository.IdList as jest.Mock).mockResolvedValue(mockUserIds);
      (CurrencyAdapter.fetchCurrencyRates as jest.Mock).mockResolvedValue(
        mockCurrencyRates
      );

      (UsStockRepository.List as jest.Mock).mockResolvedValue(mockUsStocks);
      (JapanStockRepository.List as jest.Mock).mockResolvedValue(
        mockJapanStocks
      );
      (JapanFundRepository.List as jest.Mock).mockResolvedValue(mockJapanFunds);
      (FixedIncomeAssetRepository.List as jest.Mock).mockResolvedValue(
        mockFixedIncomeAssets
      );
      (CryptoRepository.List as jest.Mock).mockResolvedValue(mockCryptos);
      (CashRepository.List as jest.Mock).mockResolvedValue(mockCashes);

      (AssetHistoryRepository.GetLatest as jest.Mock).mockResolvedValue(null);
      (AssetHistoryRepository.Create as jest.Mock).mockResolvedValue({} as any);

      const response: AssetCreatedResponse = await CreateAssetHistory();

      expect(response.message).toBe("処理が完了しました！");
      expect(UserRepository.IdList).toHaveBeenCalledTimes(1);
      expect(CurrencyAdapter.fetchCurrencyRates).toHaveBeenCalledTimes(1);

      expect(UsStockRepository.List).toHaveBeenCalledTimes(mockUserIds.length);
      expect(JapanStockRepository.List).toHaveBeenCalledTimes(
        mockUserIds.length
      );
      expect(JapanFundRepository.List).toHaveBeenCalledTimes(
        mockUserIds.length
      );
      expect(FixedIncomeAssetRepository.List).toHaveBeenCalledTimes(
        mockUserIds.length
      );
      expect(CryptoRepository.List).toHaveBeenCalledTimes(mockUserIds.length);
      expect(CashRepository.List).toHaveBeenCalledTimes(mockUserIds.length);

      expect(AssetHistoryRepository.Create).toHaveBeenCalledTimes(
        mockUserIds.length
      );
    });

    it("should not create asset history if today's history already exists", async () => {
      const today = new Date();
      (UserRepository.IdList as jest.Mock).mockResolvedValue(mockUserIds);
      (CurrencyAdapter.fetchCurrencyRates as jest.Mock).mockResolvedValue(
        mockCurrencyRates
      );

      (UsStockRepository.List as jest.Mock).mockResolvedValue(mockUsStocks);
      (JapanStockRepository.List as jest.Mock).mockResolvedValue(
        mockJapanStocks
      );
      (JapanFundRepository.List as jest.Mock).mockResolvedValue(mockJapanFunds);
      (FixedIncomeAssetRepository.List as jest.Mock).mockResolvedValue(
        mockFixedIncomeAssets
      );
      (CryptoRepository.List as jest.Mock).mockResolvedValue(mockCryptos);
      (CashRepository.List as jest.Mock).mockResolvedValue(mockCashes);

      (AssetHistoryRepository.GetLatest as jest.Mock).mockResolvedValue({
        createdAt: today,
      } as any);

      const consoleSpy = jest.spyOn(console, "log");

      const response: AssetCreatedResponse = await CreateAssetHistory();

      expect(response.message).toBe("処理が完了しました！");
      expect(consoleSpy).toHaveBeenCalledWith(
        `本日分の資産は既に登録されています: user1`
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        `本日分の資産は既に登録されています: user2`
      );

      expect(UserRepository.IdList).toHaveBeenCalledTimes(1);
      expect(CurrencyAdapter.fetchCurrencyRates).toHaveBeenCalledTimes(1);

      expect(UsStockRepository.List).toHaveBeenCalledTimes(mockUserIds.length);
      expect(JapanStockRepository.List).toHaveBeenCalledTimes(
        mockUserIds.length
      );
      expect(JapanFundRepository.List).toHaveBeenCalledTimes(
        mockUserIds.length
      );
      expect(FixedIncomeAssetRepository.List).toHaveBeenCalledTimes(
        mockUserIds.length
      );
      expect(CryptoRepository.List).toHaveBeenCalledTimes(mockUserIds.length);
      expect(CashRepository.List).toHaveBeenCalledTimes(mockUserIds.length);

      expect(AssetHistoryRepository.Create).not.toHaveBeenCalled();
    });
  });
});
