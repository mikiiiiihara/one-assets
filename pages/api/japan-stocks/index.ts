import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { CreateJapanStockInput } from "@server/repositories/stock/jp/input";
import { createJapanStock } from "@server/services/japan-stock/japan-stock.service";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JapanStockModel | ErrorResponse>
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
    typeof req.body.quantity !== "number" ||
    typeof req.body.dividends !== "number" ||
    typeof req.body.sector !== "string"
  ) {
    res.status(400).json({
      message:
        "Invalid type for code, name,getPrice, quantity, or sector, expected correct types",
    });
    return;
  }

  const input: CreateJapanStockInput = {
    code: req.body.code,
    name: req.body.name,
    getPrice: req.body.getPrice,
    quantity: req.body.quantity,
    dividends: req.body.dividends,
    sector: req.body.sector,
    isNoTax: req.body.isNoTax || false,
    userId: session.user.id,
    cashId: req.body.cashId,
    changedPrice: req.body.changedPrice,
  };
  try {
    const newStock = await createJapanStock(input);
    res.status(201).json(newStock);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error creating Japan stock" });
  }
}
