// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { AssetHistoryList } from "@server/services/asset-history/asset-history.service";
import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";
import { ErrorResponse } from "@server/utils/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssetHistoryModel[] | ErrorResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { day } = req.query;
  const dayNumber = day ? parseInt(day as string, 10) : undefined;

  try {
    const assetHistories = await AssetHistoryList(session.user.id, dayNumber);
    return res.json(assetHistories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
