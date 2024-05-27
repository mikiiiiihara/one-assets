import { UpdateUsStockInput } from "@server/repositories/stock/us/input";
import { UsStockModel } from "@server/repositories/stock/us/us-stock.model";
import {
  deleteUsStock,
  updateUsStock,
} from "@server/services/us-stock/us-stock.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsStockModel | ErrorResponse>
) {
  if (req.method !== "PUT" && req.method !== "DELETE") {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { id } = req.query;

  if (req.method === "PUT") {
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

  if (req.method === "DELETE") {
    try {
      const deletedStock = await deleteUsStock(id as string);
      res.status(200).json(deletedStock);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ message: "Error deleting US stock" });
    }
  }
}
