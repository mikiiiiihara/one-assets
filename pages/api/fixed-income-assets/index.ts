import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { CreateFixedIncomeAssetInput } from "@server/repositories/fixed-income-asset/input";
import { createFixedIncomeAsset } from "@server/services/fixed-income-asset/fixed-income-asset.service";
import { FixedIncomeAssetModel } from "@server/repositories/fixed-income-asset/fixed-income-asset.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FixedIncomeAssetModel | ErrorResponse>
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
    typeof req.body.getPriceTotal !== "number" ||
    typeof req.body.dividendRate !== "number" ||
    typeof req.body.usdjpy !== "number" ||
    !Array.isArray(req.body.paymentMonth) ||
    !req.body.paymentMonth.every((month: any) => typeof month === "number")
  ) {
    res.status(400).json({
      message:
        "Invalid type for code, getPriceTotal, dividendRate, usdjpy, paymentMonth, expected correct types",
    });
    return;
  }

  const input: CreateFixedIncomeAssetInput = {
    code: req.body.code,
    getPriceTotal: req.body.getPriceTotal,
    dividendRate: req.body.dividendRate,
    usdjpy: req.body.usdjpy,
    paymentMonth: req.body.paymentMonth,
    userId: session.user.id,
  };

  try {
    const newAsset = await createFixedIncomeAsset(input);
    res.status(201).json(newAsset);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error creating fixed income asset" });
  }
}
