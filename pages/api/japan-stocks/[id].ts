import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { JapanStockModel } from "@server/repositories/stock/jp/japan-stock.model";
import {
  deleteJapanStock,
  updateJapanStock,
} from "@server/services/japan-stock/japan-stock.service";
import {
  DeleteJapanStockInput,
  UpdateJapanStockInput,
} from "@server/repositories/stock/jp/input";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JapanStockModel | ErrorResponse>
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
      typeof req.body.getPrice !== "number"
    ) {
      res.status(400).json({
        message: "Invalid type for quantity, or getPrice, expected a number",
      });
      return;
    }

    const input: UpdateJapanStockInput = {
      id: id as string,
      quantity: req.body.quantity,
      getPrice: req.body.getPrice,
      cashId: req.body.cashId,
      changedPrice: req.body.changedPrice,
    };

    try {
      const updatedStock = await updateJapanStock(input);
      res.status(200).json(updatedStock);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ message: "Error updating Japan stock" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const input: DeleteJapanStockInput = {
        id: id as string,
        cashId: req.body.cashId,
        changedPrice: req.body.changedPrice,
      };
      const deletedStock = await deleteJapanStock(input);
      res.status(200).json(deletedStock);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ message: "Error deleting Japan stock" });
    }
  }
}
