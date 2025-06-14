import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  updateFixedIncomeAsset,
  deleteFixedIncomeAsset,
} from "@server/services/fixed-income-asset/fixed-income-asset.service";
import { Get } from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import { errorHandler } from "@server/utils/error";

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const asset = await Get(id);
    if (!asset) {
      return res.status(404).json({ error: "Fixed income asset not found" });
    }
    res.status(200).json(asset);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const { getPriceTotal, dividendRate, usdjpy, paymentMonth } = req.body;

  try {
    const updatedAsset = await updateFixedIncomeAsset({
      id,
      getPriceTotal,
      dividendRate,
      usdjpy,
      paymentMonth,
    });
    res.status(200).json(updatedAsset);
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
    const deletedAsset = await deleteFixedIncomeAsset(id);
    res.status(200).json(deletedAsset);
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