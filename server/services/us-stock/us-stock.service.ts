import {
  CreateUsStockInput,
  UpdateUsStockInput,
} from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import {
  Create,
  List,
  Update,
} from "@server/repositories/stock/us/us-stock.repository";

export const usStocks = async (userId: string) => await List(userId);

/**
 * Create a new US stock entry.
 *
 * @param input The data needed to create the US stock entry.
 * @returns The created US stock object.
 */
export const createUsStock = async (
  input: CreateUsStockInput
): Promise<UsStockModel> => {
  const newStock = await Create(input);
  return newStock;
};

/**
 * Update a US stock
 *
 * @param input The data needed to update the US stock.
 * @returns The updated US stock object.
 */
export const updateUsStock = async (
  input: UpdateUsStockInput
): Promise<UsStockModel> => {
  const newStock = await Update(input);
  return newStock;
};
