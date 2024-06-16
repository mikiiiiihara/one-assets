import {
  Get,
  Update as UpdateCash,
} from "@server/repositories/cash/cash.repository";
import { UpdateCashInput } from "@server/repositories/cash/input";
import {
  Create,
  Delete,
  Update,
} from "@server/repositories/stock/jp/japan-stock.repository";
import prismaClient from "@server/lib/prisma-client";
import {
  CreateJapanStockInput,
  DeleteJapanStockInput,
  UpdateJapanStockInput,
} from "@server/repositories/stock/jp/input";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";

/**
 * Create a new Japan stock entry.
 *
 * @param input The data needed to create the Japna stock entry.
 * @returns The created Japan stock object.
 */
export const createJapanStock = async (
  input: CreateJapanStockInput
): Promise<JapanStockModel> => {
  return await prismaClient.$transaction(async (prisma) => {
    const newStock = await Create(input);

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

/**
 * Update a Japan stock
 *
 * @param input The data needed to update the Japan stock.
 * @returns The updated Japan stock object.
 */
export const updateJapanStock = async (
  input: UpdateJapanStockInput
): Promise<JapanStockModel> => {
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
export const deleteJapanStock = async (
  input: DeleteJapanStockInput
): Promise<JapanStockModel> => {
  return await prismaClient.$transaction(async (prisma) => {
    const deletedStock = await Delete(input.id);
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
        price: cash.price + input.changedPrice,
      };
      await UpdateCash(updateCashInput);
    }
    return deletedStock;
  });
};
