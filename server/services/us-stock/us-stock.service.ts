import {
  Get,
  Update as UpdateCash,
} from "@server/repositories/cash/cash.repository";
import { UpdateCashInput } from "@server/repositories/cash/input";
import {
  CreateUsStockInput,
  DeleteUsStockInput,
  UpdateUsStockInput,
} from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import {
  Create,
  Delete,
  List,
  Update,
  FetchMarketData,
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
  // トランザクション内でDBの処理のみを行う
  const newStock = await prismaClient.$transaction(async (prisma) => {
    const createdStock = await Create(input, prisma);

    // cashIdが連携されている場合、cashの更新を行う
    if (input.cashId) {
      const cash = await Get(input.cashId, prisma);
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
      await UpdateCash(updateCashInput, prisma);
    }

    return createdStock;
  });

  // トランザクション外でAPI呼び出しを行う
  try {
    return await FetchMarketData(newStock);
  } catch (error) {
    // APIエラーが発生してもDB処理は成功しているので、最低限の情報を返す
    console.error("Failed to fetch market data:", error);
    return {
      ...newStock,
      currentPrice: newStock.getPrice,
      priceGets: 0,
      currentRate: 0,
      dividends: [],
    };
  }
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
  // トランザクション内でDBの処理のみを行う
  const updatedStock = await prismaClient.$transaction(async (prisma) => {
    const stock = await Update(input, prisma);

    // cashIdが連携されている場合、cashの更新を行う
    if (input.cashId) {
      const cash = await Get(input.cashId, prisma);
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
      await UpdateCash(updateCashInput, prisma);
    }

    return stock;
  });

  // トランザクション外でAPI呼び出しを行う
  try {
    return await FetchMarketData(updatedStock);
  } catch (error) {
    // APIエラーが発生してもDB処理は成功しているので、最低限の情報を返す
    console.error("Failed to fetch market data:", error);
    return {
      ...updatedStock,
      currentPrice: updatedStock.getPrice,
      priceGets: 0,
      currentRate: 0,
      dividends: [],
    };
  }
};
export const deleteUsStock = async (
  input: DeleteUsStockInput
): Promise<UsStockModel> => {
  return await prismaClient.$transaction(async (prisma) => {
    const deletedStock = await Delete(input.id, prisma);
    // cashIdが連携されている場合、cashの更新を行う
    if (input.cashId) {
      const cash = await Get(input.cashId, prisma);
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
      await UpdateCash(updateCashInput, prisma);
    }
    return deletedStock;
  });
};
