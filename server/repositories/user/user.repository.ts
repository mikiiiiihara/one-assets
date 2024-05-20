import prismaClient from "@server/lib/prisma-client";
import { UserModel } from "./user.model";

/**
 * Fetch user by id
 */
export const Get = async (id: string): Promise<UserModel> => {
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

export const IdList = async (): Promise<string[]> => {
  // Fetch all users from DB
  const ids = await prismaClient.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return ids.map((id) => id.id);
};
