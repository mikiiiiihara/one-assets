import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";

/**
 * 全アセットの総額を計算
 */
export const buildAssetHistory = (assetHistoryModel: AssetHistoryModel) => {
  const { cash, stock, fund, crypto, fixedIncomeAsset } = assetHistoryModel;
  return Math.round(
    ((cash + stock + fund + crypto + fixedIncomeAsset) * 10) / 10
  );
};
