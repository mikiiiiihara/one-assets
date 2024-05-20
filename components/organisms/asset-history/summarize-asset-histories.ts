import { StackedAreaType } from "@components/atoms/graph/stacked-area";
import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";

/**
 * 配列内のTotalAssetオブジェクトから各資産カテゴリごとのデータを抽出し、整理する
 */
export const summarizeAssetHistories = (assets: AssetHistoryModel[]) => {
  // 各資産カテゴリに対応するデータを格納するためのマップオブジェクト
  const summaries = {
    cash: [] as number[],
    crypto: [] as number[],
    fixedIncomeAsset: [] as number[],
    fund: [] as number[],
    stock: [] as number[],
  };

  // 各資産のデータをマップに追加
  assets.forEach((asset) => {
    summaries.cash.push(asset.cash);
    summaries.crypto.push(asset.crypto);
    summaries.fixedIncomeAsset.push(asset.fixedIncomeAsset);
    summaries.fund.push(asset.fund);
    summaries.stock.push(asset.stock);
  });
  const response: StackedAreaType[] = [
    { name: "現金", data: summaries.cash },
    { name: "仮想通貨", data: summaries.crypto },
    { name: "固定利回資産", data: summaries.fixedIncomeAsset },
    { name: "投資信託", data: summaries.fund },
    { name: "株式", data: summaries.stock },
  ];
  // 最終的な出力形式に変換
  return response;
};
