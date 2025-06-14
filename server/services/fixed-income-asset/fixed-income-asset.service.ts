import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";
import { Create, Update, Delete } from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import { CreateFixedIncomeAssetInput, UpdateFixedIncomeAssetInput } from "@server/repositories/fixed-income-asset/input";

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

/**
 * Update a fixed income asset.
 *
 * @param input The data needed to update the fixed income asset.
 * @returns The updated fixed income asset object.
 */
export const updateFixedIncomeAsset = async (
  input: UpdateFixedIncomeAssetInput
): Promise<FixedIncomeAssetModel> => {
  const updatedAsset = await Update(input);
  return updatedAsset;
};

/**
 * Delete a fixed income asset.
 *
 * @param id The ID of the fixed income asset to delete.
 * @returns The deleted fixed income asset object.
 */
export const deleteFixedIncomeAsset = async (
  id: string
): Promise<FixedIncomeAssetModel> => {
  const deletedAsset = await Delete(id);
  return deletedAsset;
};
