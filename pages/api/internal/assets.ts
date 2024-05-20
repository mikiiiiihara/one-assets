// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@server/utils/error";
import {
  AssetCreatedResponse,
  CreateAssetHistory,
} from "@server/services/asset-history/asset-history.service";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AssetCreatedResponse | ErrorResponse>
) {
  const response = await CreateAssetHistory();
  return res.json(response);
}
