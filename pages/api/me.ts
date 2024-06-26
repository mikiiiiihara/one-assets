// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { getUserById } from "@server/services/user/user.service";
import { ErrorResponse } from "@server/utils/error";
type Data = {
  name?: string;
  email?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  // req.method === "GET"のように、リクエストのメソッドごとに処理を分岐することも可能
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const user = await getUserById(session.user.id);
  return res.json(user);
}
