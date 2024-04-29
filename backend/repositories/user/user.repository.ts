import prismaClient from "@backend/lib/prisma-client";
import { UserModel } from "./user.model";

/**
 * Fetch user by id
 */
export const findById = async (id: string): Promise<UserModel> => {
  // Fetch user from DB
  const user = await prismaClient.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
    },
  });
  if (user == null) throw new Error("User not found");
  const { name, email } = user;
  return { name: name ?? undefined, email: email ?? undefined };
};
