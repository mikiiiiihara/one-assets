import { findById } from "@backend/repositories/user/user.repository";

/**
 * Fetch user by id
 */
export const userById = async (id: string) => {
  return await findById(id);
};
