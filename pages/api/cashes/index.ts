import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ErrorResponse } from "@server/utils/error";
import { CashModel } from "@server/repositories/cash/cash.model";
import { getCashes, createCash } from "@server/services/cash/cash.service";
import { CreateCashInput } from "@server/repositories/cash/input";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CashModel[] | CashModel | ErrorResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  switch (req.method) {
    case "GET":
      const assets = await getCashes(session.user.id);
      return res.json(assets);

    case "POST":
      // バリデーション
      if (
        typeof req.body.name !== "string" ||
        typeof req.body.price !== "number" ||
        typeof req.body.sector !== "string"
      ) {
        res
          .status(400)
          .json({ message: "Invalid type for name, price, sector" });
        return;
      }
      const input: CreateCashInput = {
        name: req.body.name,
        price: req.body.price,
        sector: req.body.sector,
        userId: session.user.id,
      };
      const newCash = await createCash(input);
      return res.status(201).json(newCash);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
