import {
  Get,
  Update as UpdateCash,
} from "@server/repositories/cash/cash.repository";
import { UpdateCashInput } from "@server/repositories/cash/input";
import {
  CreateUsStockInput,
  UpdateUsStockInput,
} from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import {
  Create,
  Delete,
  List,
  Update,
} from "@server/repositories/stock/us/us-stock.repository";
import prismaClient from "@server/lib/prisma-client";
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
  return await prismaClient.$transaction(async (prisma) => {
    const newStock = await Update(input);

    // cashIdが連携されている場合、cashの更新を行う
    if (input.cashId) {
      const cash = await Get(input.cashId);
      if (cash == null) throw new Error("Cash not found");

      // cashIdとchangedPriceは両方揃っているはずなので、changedPriceが0&nullの場合はエラー
      if (!input.changedPrice) {
        throw new Error("changedPrice is required");
      }

      // cashの更新処理を行う
      const updateCashInput: UpdateCashInput = {
        id: cash.id,
        price: cash.price - input.changedPrice,
      };
      await UpdateCash(updateCashInput);
    }

    return newStock;
  });
};
export const deleteUsStock = async (id: string): Promise<UsStockModel> => {
  return await Delete(id);
};
