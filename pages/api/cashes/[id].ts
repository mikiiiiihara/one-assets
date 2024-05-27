import { CashModel } from "@server/repositories/cash/cash.model";
import { UpdateCashInput } from "@server/repositories/cash/input";
import { deleteCash, updateCash } from "@server/services/cash/cash.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CashModel | ErrorResponse>
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

  if (req.method === "DELETE") {
    try {
      const deletedCash = await deleteCash(id as string);
      res.status(200).json(deletedCash);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ message: "Error deleting cash" });
    }
  }
}
