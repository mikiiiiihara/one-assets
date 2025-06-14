import { Create, Update, Delete } from "@server/repositories/crypto/crypto.repository";
import { CreateCryptoInput, UpdateCryptoInput } from "@server/repositories/crypto/input";
import { CryptoModel } from "@server/repositories/crypto/crypto.model";

/**
 * Create a crypto
 *
 * @param input The data needed to update the crypto.
 * @returns The created crypto object.
 */
export const createCrypto = async (
  input: CreateCryptoInput
): Promise<CryptoModel> => {
  const newCrypto = await Create(input);
  return newCrypto;
};

/**
 * Update a crypto
 *
 * @param input The data needed to update the crypto.
 * @returns The updated crypto object.
 */
export const updateCrypto = async (
  input: UpdateCryptoInput
): Promise<CryptoModel> => {
  const updatedCrypto = await Update(input);
  return updatedCrypto;
};

/**
 * Delete a crypto
 *
 * @param id The ID of the crypto to delete.
 * @returns The deleted crypto object.
 */
export const deleteCrypto = async (id: string): Promise<CryptoModel> => {
  const deletedCrypto = await Delete(id);
  return deletedCrypto;
};
