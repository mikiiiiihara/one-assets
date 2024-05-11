import { CreateUsStockInput } from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import {
  Create,
  List,
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
