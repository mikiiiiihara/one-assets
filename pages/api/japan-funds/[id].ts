import {
  DeleteJapanFundInput,
  UpdateJapanFundInput,
} from "@server/repositories/japan-fund/input";
import { JapanFundModel } from "@server/repositories/japan-fund/japan-fund.model";
import {
  deleteJapanFund,
  updateJapanFund,
} from "@server/services/japan-fund/japan-fund.service";
import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JapanFundModel | ErrorResponse>
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
      cashId: req.body.cashId,
      changedPrice: req.body.changedPrice,
    };

    try {
      const updatedJapanFund = await updateJapanFund(input);
      res.status(200).json(updatedJapanFund);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ message: "Error updating Japan fund" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const input: DeleteJapanFundInput = {
        id: id as string,
        cashId: req.body.cashId,
        changedPrice: req.body.changedPrice,
      };
      const deletedFund = await deleteJapanFund(input);
      res.status(200).json(deletedFund);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ message: "Error deleting Japan fund" });
    }
  }
}
