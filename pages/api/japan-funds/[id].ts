import { UpdateJapanFundInput } from "@server/repositories/japan-fund/input";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";
import { updateJapanFund } from "@server/services/japan-fund/japan-fund.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JapanFundModel | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query;

  if (
    typeof req.body.name !== "string" ||
    typeof req.body.code !== "string" ||
    typeof req.body.getPriceTotal !== "number" ||
    typeof req.body.getPrice !== "number"
  ) {
    res.status(400).json({
      message: "Invalid type for name, code, getPriceTotal, or getPrice",
    });
    return;
  }

  const input: UpdateJapanFundInput = {
    id: id as string,
    name: req.body.name,
    code: req.body.code,
    getPriceTotal: req.body.getPriceTotal,
    getPrice: req.body.getPrice,
  };

  try {
    const updatedJapanFund = await updateJapanFund(input);
    res.status(200).json(updatedJapanFund);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error updating japan fund" });
  }
}
