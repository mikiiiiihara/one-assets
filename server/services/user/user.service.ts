import { Get } from "@server/repositories/user/user.repository";

/**
 * Fetch user by id
 */
export const userById = async (id: string) => {
  return await Get(id);
};
