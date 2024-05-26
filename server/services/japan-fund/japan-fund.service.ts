import { UpdateJapanFundInput } from "@server/repositories/japan-fund/input";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";
import { Update } from "@server/repositories/japan-fund/japan-fund.repository";

/**
 * Update a japan fund
 *
 * @param input The data needed to update the japan fund.
 * @returns The updated japan fund object.
 */
export const updateJapanFund = async (
  input: UpdateJapanFundInput
): Promise<JapanFundModel> => {
  const newFund = await Update(input);
  return newFund;
};
