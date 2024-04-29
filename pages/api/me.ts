// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { userById } from "@backend/services/user/user.service";
import { authOptions } from "./auth/[...nextauth]";
type Data = {
  name?: string;
  email?: string;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  // Fetch user from DB
  const user = await userById(session.user.id);
  return res.json(user);
}
