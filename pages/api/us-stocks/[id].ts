import { UpdateUsStockInput } from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import { updateUsStock } from "@server/services/us-stock/us-stock.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsStockModel | ErrorResponse>
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query;

  if (
    typeof req.body.quantity !== "number" ||
    typeof req.body.getPrice !== "number" ||
    typeof req.body.usdJpy !== "number"
  ) {
    res.status(400).json({
      message:
        "Invalid type for quantity, getPrice, or usdJpy, expected a number",
    });
    return;
  }

  const input: UpdateUsStockInput = {
    id: id as string,
    quantity: req.body.quantity,
    getPrice: req.body.getPrice,
    usdjpy: req.body.usdJpy,
  };

  try {
    const updatedStock = await updateUsStock(input);
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error updating US stock" });
  }
}
