import type { NextApiRequest, NextApiResponse } from "next";

export type ErrorResponse = {
  message: string;
};

export function errorHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.error("Request error", error);
  res.status(500).json({ 
    message: error instanceof Error ? error.message : "Internal server error" 
  });
}
