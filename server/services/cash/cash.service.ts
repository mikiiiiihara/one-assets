import { CashModel } from "@server/repositories/cash/cash.model";
import {
  Create,
  Delete,
  List,
  Update,
} from "@server/repositories/cash/cash.repository";
import {
  CreateCashInput,
  UpdateCashInput,
} from "@server/repositories/cash/input";

export const getCashes = async (userId: string): Promise<CashModel[]> => {
  return await List(userId);
};
/**
 * Create a cash
 *
 * @param input The data needed to update the cash.
 * @returns The created cash object.
 */
export const createCash = async (
  input: CreateCashInput
): Promise<CashModel> => {
  const newCash = await Create(input);
  return newCash;
};

/**
 * Update a cash
 *
 * @param input The data needed to update the cash.
 * @returns The updated cash object.
 */
export const updateCash = async (
  input: UpdateCashInput
): Promise<CashModel> => {
  const newCash = await Update(input);
  return newCash;
};

export const deleteCash = async (id: string): Promise<CashModel> => {
  return await Delete(id);
};
