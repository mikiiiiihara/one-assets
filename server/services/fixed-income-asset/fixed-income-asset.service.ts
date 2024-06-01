import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";
import { Create } from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import { CreateFixedIncomeAssetInput } from "@server/repositories/fixed-income-asset/input";

/**
 * Create a new fixed income asset entry.
 *
 * @param input The data needed to create the fixed income asset entry.
 * @returns The created fixed income asset object.
 */
export const createFixedIncomeAsset = async (
  input: CreateFixedIncomeAssetInput
): Promise<FixedIncomeAssetModel> => {
  const newAsset = await Create(input);
  return newAsset;
};
