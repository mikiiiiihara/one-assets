import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";
import { List } from "@server/repositories/asset-history/asset.history.repository";

export const AssetHistoryList = async (
  userId: string,
  day?: number
): Promise<AssetHistoryModel[]> => {
  return await List(userId, day);
};
