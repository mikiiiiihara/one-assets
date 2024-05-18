import { CashModel } from "@server/repositories/cash/cash.model";
import { UpdateCashInput } from "@server/repositories/cash/input";
import { updateCash } from "@server/services/cash/cash.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CashModel | ErrorResponse>
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query;

  if (typeof req.body.price !== "number") {
    res.status(400).json({
      message: "Invalid type for price, expected a number",
    });
    return;
  }

  const input: UpdateCashInput = {
    id: id as string,
    price: req.body.price,
  };

  try {
    const updatedCash = await updateCash(input);
    res.status(200).json(updatedCash);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error updating cash" });
  }
}
