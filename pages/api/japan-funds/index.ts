import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { CreateJapanFundInput } from "@server/repositories/japan-fund/input";
import { createJapanFund } from "@server/services/japan-fund/japan-fund.service";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JapanFundModel | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  if (
    typeof req.body.code !== "string" ||
    typeof req.body.name !== "string" ||
    typeof req.body.getPrice !== "number" ||
    typeof req.body.getPriceTotal !== "number"
  ) {
    res.status(400).json({
      message:
        "Invalid type for code, name,getPrice, or getPriceTotal, expected correct types",
    });
    return;
  }

  const input: CreateJapanFundInput = {
    code: req.body.code,
    name: req.body.name,
    getPrice: req.body.getPrice,
    getPriceTotal: req.body.getPriceTotal,
    userId: session.user.id,
  };
  try {
    const newFund = await createJapanFund(input);
    res.status(201).json(newFund);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error creating Japan fund" });
  }
}
