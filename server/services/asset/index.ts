import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";
import { Dividend } from "@server/repositories/stock/us/us-stock.model";

/**
 * 日本株式の配当を作成する
 */
export const buildDividendOfJapanStock = (
  annualDividend: number
): Dividend[] => {
  // 日本株式の配当は年2回
  const dividendAmount = annualDividend / 2;
  const nextYear = new Date().getFullYear() + 1;
  return [
    {
      fixedDate: new Date(new Date().getFullYear(), 5, 24),
      paymentDate: new Date(new Date().getFullYear(), 8, 24),
      price: dividendAmount,
    },
    {
      fixedDate: new Date(new Date().getFullYear(), 11, 24),
      paymentDate: new Date(nextYear, 2, 24),
      price: dividendAmount,
    },
  ];
};

/**
 * 固定利回り資産の配当を作成する
 */
export const buildDividendOfFixedIncomeAsset = (
  fixedIncomeAssetModel: FixedIncomeAssetModel
): Dividend[] => {
  // 配当の支払い回数を取得
  const countOfPayment = fixedIncomeAssetModel.paymentMonth.length;
  // 1回あたりの配当金額を計算
  const dividendAmount =
    ((fixedIncomeAssetModel.dividendRate / 100) *
      fixedIncomeAssetModel.getPriceTotal *
      fixedIncomeAssetModel.usdjpy) /
    countOfPayment;
  return fixedIncomeAssetModel.paymentMonth.map((month) => ({
    fixedDate: new Date(new Date().getFullYear(), month, 1),
    paymentDate: new Date(new Date().getFullYear(), month, 1),
    price: Math.round(dividendAmount * 10) / 10,
  }));
};
