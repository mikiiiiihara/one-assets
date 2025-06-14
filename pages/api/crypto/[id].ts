import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  updateCrypto,
  deleteCrypto,
} from "@server/services/crypto/crypto.service";
import { Get } from "@server/repositories/crypto/crypto.repository";
import { errorHandler } from "@server/utils/error";

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const crypto = await Get(id);
    if (!crypto) {
      return res.status(404).json({ error: "Crypto not found" });
    }
    res.status(200).json(crypto);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const { getPrice, quantity } = req.body;

  try {
    const updatedCrypto = await updateCrypto({
      id,
      getPrice,
      quantity,
    });
    res.status(200).json(updatedCrypto);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const deletedCrypto = await deleteCrypto(id);
    res.status(200).json(deletedCrypto);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}