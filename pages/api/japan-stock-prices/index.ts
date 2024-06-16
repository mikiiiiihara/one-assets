// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ErrorResponse } from "@server/utils/error";
import { JapanStockPriceModel } from "@server/repositories/japan-stock-price/japan-stock-price.model";
import { japanStockPrices } from "@server/services/japan-stock-price/japan-stock-price.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JapanStockPriceModel[] | ErrorResponse>
) {
  // req.method === "GET"のように、リクエストのメソッドごとに処理を分岐することも可能
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const prices = await japanStockPrices();
  return res.json(prices);
}
