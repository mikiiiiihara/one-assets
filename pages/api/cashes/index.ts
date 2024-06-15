// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ErrorResponse } from "@server/utils/error";
import { CashModel } from "@server/repositories/cash/cash.model";
import { getCashes } from "@server/services/cash/cash.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CashModel[] | ErrorResponse>
) {
  // req.method === "GET"のように、リクエストのメソッドごとに処理を分岐することも可能
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const assets = await getCashes(session.user.id);
  return res.json(assets);
}
