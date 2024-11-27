// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@server/utils/error";
import {
  AssetCreatedResponse,
  CreateAssetHistory,
} from "@server/services/asset-history/asset-history.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssetCreatedResponse | ErrorResponse>
) {
  const authHeader = req.headers["authorization"];
  if (process.env.ENV !== "development" && checkCronSecret(authHeader)) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  const response = await CreateAssetHistory();
  return res.json(response);
}

const checkCronSecret = (authHeader: string | undefined) => {
  return (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  );
};
