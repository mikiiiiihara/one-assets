import prismaClient from "@server/lib/prisma-client";
import {
  Get,
  Update as UpdateCash,
} from "@server/repositories/cash/cash.repository";
import { UpdateCashInput } from "@server/repositories/cash/input";
import {
  CreateJapanFundInput,
  DeleteJapanFundInput,
  UpdateJapanFundInput,
} from "@server/repositories/japan-fund/input";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";
import {
  Create,
  Delete,
  Update,
} from "@server/repositories/japan-fund/japan-fund.repository";

/**
 * Create a japan fund
 *
 * @param input The data needed to create the japan fund.
 * @returns The created japan fund object.
 */
export const createJapanFund = async (
  input: CreateJapanFundInput
): Promise<JapanFundModel> => {
  return await prismaClient.$transaction(async (prisma) => {
    const newFund = await Create(input);
    return newFund;
  });
};

/**
 * Update a japan fund
 *
 * @param input The data needed to update the japan fund.
 * @returns The updated japan fund object.
 */
export const updateJapanFund = async (
  input: UpdateJapanFundInput
): Promise<JapanFundModel> => {
  return await prismaClient.$transaction(async (prisma) => {
    const newFund = await Update(input);

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

    return newFund;
  });
};

export const deleteJapanFund = async (
  input: DeleteJapanFundInput
): Promise<JapanFundModel> => {
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
