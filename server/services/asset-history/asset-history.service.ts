import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";
import {
  Create,
  GetLatest,
  List,
} from "@server/repositories/asset-history/asset-history.repository";
import { IdList } from "@server/repositories/user/user.repository";
import { List as UsStockList } from "@server/repositories/stock/us/us-stock.repository";
import { List as JapanFundList } from "@server/repositories/japan-fund/japan-fund.repository";
import { List as JapanStockList } from "@server/repositories/stock/jp/japan-stock.repository";
import { List as FixedIncomeAssetList } from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import { List as CashList } from "@server/repositories/cash/cash.repository";
import { List as CryptoList } from "@server/repositories/crypto/crypto.repository";
import { fetchCurrencyRates } from "@server/adapters/currency/currency.adapter";
import { CreateAssetHistoryInput } from "@server/repositories/asset-history/input";

export const AssetHistoryList = async (
  userId: string,
  day?: number,
  startDate?: Date,
  endDate?: Date
): Promise<AssetHistoryModel[]> => {
  const utcStartDate = startDate
    ? new Date(startDate.toISOString())
    : undefined;
  const utcEndDate = endDate ? new Date(endDate.toISOString()) : undefined;

  return await List(userId, day, utcStartDate, utcEndDate);
};

export type AssetCreatedResponse = {
  message: string;
};

export const CreateAssetHistory = async (): Promise<AssetCreatedResponse> => {
  const userIds = await IdList();
  // 現在のドル円を取得
  const currencyRates = await fetchCurrencyRates();
  const currentUsdJpy = Number(
    currencyRates.filter((rate) => rate.currencyPairCode === "USDJPY")[0].bid
  );

  // 全ユーザーの資産登録を並行して処理
  await Promise.all(
    userIds.map(async (userId) => executeCreation(userId, currentUsdJpy))
  );

  const response: AssetCreatedResponse = {
    message: "処理が完了しました！",
  };
  return response;
};

const executeCreation = async (userId: string, currentUsdJpy: number) => {
  // 米国株式情報を取得
  const usStocks = await UsStockList(userId);
  // 米国株の合計値を計算
  const totalOfUsStock = usStocks.reduce(
    (total, usStock) =>
      total + usStock.currentPrice * usStock.quantity * currentUsdJpy,
    0
  );
  // 日本株の合計値を計算
  const japanStocks = await JapanStockList(userId);
  const totalOfJapanStock = japanStocks.reduce(
    (total, japanStock) =>
      total + japanStock.currentPrice * japanStock.quantity,
    0
  );
  // 日本投資信託の合計値を計算
  const japanFunds = await JapanFundList(userId);
  const totalOfJapanFund = japanFunds.reduce(
    (total, japanFund) =>
      total +
      (japanFund.getPriceTotal * japanFund.currentPrice) / japanFund.getPrice,
    0
  );
  // 固定金利資産の合計値を計算
  const fixedIncomeAssets = await FixedIncomeAssetList(userId);
  const totalOfFixedIncomeAsset = fixedIncomeAssets.reduce(
    (total, fixedIncomeAsset) => total + fixedIncomeAsset.getPriceTotal,
    0
  );
  // 仮想通貨の合計値を計算
  const cryptos = await CryptoList(userId);
  const totalOfCrypto = cryptos.reduce(
    (total, crypto) => total + crypto.currentPrice * crypto.quantity,
    0
  );
  // 現金の合計値を計算
  const cashes = await CashList(userId);
  // sectorがUSDの時はドル円を掛けて足してあげる
  const totalOfCash = cashes.reduce((total, cash) => {
    if (cash.sector === "USD") {
      return total + cash.price * currentUsdJpy;
    }
    return total + cash.price;
  }, 0);
  // 本日の資産を登録
  const assetHistory: CreateAssetHistoryInput = {
    userId,
    stock: Math.round(totalOfUsStock + totalOfJapanStock * 1) / 1,
    fund: Math.round(totalOfJapanFund * 1) / 1,
    fixedIncomeAsset: Math.round(totalOfFixedIncomeAsset * 1) / 1,
    crypto: Math.round(totalOfCrypto * 1) / 1,
    cash: Math.round(totalOfCash * 1) / 1,
  };
  const latestAsset = await GetLatest(userId);
  if (latestAsset != null) {
    // createdAtをJSTに直す
    const createdAt = toJSTDatePart(latestAsset.createdAt);
    const today = toJSTDatePart(new Date());
    if (createdAt === today) {
      console.log(`本日分の資産は既に登録されています: ${userId}`);
      return;
    }
  }
  await Create(assetHistory);
  console.log(`本日分の資産を登録しました: ${userId}`);
};

// JSTに変換し、日付部分のみを抽出する関数
const toJSTDatePart = (date: Date): string => {
  const offset = 9 * 60; // JSTはUTC+9
  const dateValue = new Date(date.getTime() + offset * 60 * 1000);
  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので1を足す
  const day = String(dateValue.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
