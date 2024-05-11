// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@server/utils/error";
import { getCurrentUsdJpy } from "@server/services/currency/currency.service";
import { Currency } from "@server/services/currency/currency";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Currency | ErrorResponse>
) {
  const currency = await getCurrentUsdJpy();
  return res.json(currency);
}
