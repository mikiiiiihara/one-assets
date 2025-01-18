import { Create } from "@server/repositories/crypto/crypto.repository";
import { CreateCryptoInput } from "@server/repositories/crypto/input";
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
