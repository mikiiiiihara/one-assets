import { Get } from "@server/repositories/user/user.repository";
/**
 * Fetch user by id
 */
export const getUserById = async (id: string) => await Get(id);
