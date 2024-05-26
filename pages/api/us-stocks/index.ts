import { CreateUsStockInput } from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import { createUsStock } from "@server/services/us-stock/us-stock.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsStockModel | ErrorResponse>
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
    typeof req.body.getPrice !== "number" ||
    typeof req.body.quantity !== "number" ||
    typeof req.body.sector !== "string" ||
    typeof req.body.usdjpy !== "number"
  ) {
    res.status(400).json({
      message:
        "Invalid type for code, getPrice, quantity, sector, usdjpy, expected correct types",
    });
    return;
  }

  const input: CreateUsStockInput = {
    code: req.body.code,
    getPrice: req.body.getPrice,
    quantity: req.body.quantity,
    sector: req.body.sector,
    usdjpy: req.body.usdjpy,
    userId: session.user.id,
  };

  try {
    const newStock = await createUsStock(input);
    res.status(201).json(newStock);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error creating US stock" });
  }
}
