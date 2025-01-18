import { ErrorResponse } from "@server/utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { CryptoModel } from "@server/repositories/crypto/crypto.model";
import { CreateCryptoInput } from "@server/repositories/crypto/input";
import { createCrypto } from "@server/services/crypto/crypto.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CryptoModel | ErrorResponse>
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
    typeof req.body.quantity !== "number"
  ) {
    res.status(400).json({
      message:
        "Invalid type for code, getPrice, quantity, expected correct types",
    });
    return;
  }

  const input: CreateCryptoInput = {
    code: req.body.code,
    getPrice: req.body.getPrice,
    quantity: req.body.quantity,
    userId: session.user.id,
  };

  try {
    const newCrypto = await createCrypto(input);
    res.status(201).json(newCrypto);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ message: "Error creating crypto" });
  }
}
