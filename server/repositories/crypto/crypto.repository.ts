import prismaClient from "@server/lib/prisma-client";
import { CreateCryptoInput, UpdateCryptoInput } from "./input";
import { CryptoModel } from "./crypto.model";
import { fetchCryptoPrice } from "@server/adapters/crypto-price/crypto-price.adapter";
import { Prisma } from "@prisma/client";

export const List = async (userId: string): Promise<CryptoModel[]> => {
  const cryptos = await prismaClient.crypto.findMany({
    where: { userId },
    orderBy: {
      code: "asc", //アルファベット順で取得
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
    },
  });
  if (cryptos.length === 0) return [];
  // 保有仮想通貨情報に現在のマーケットデータを付与して返却する
  return await Promise.all(
    cryptos.map(async (crypto) => {
      // 該当銘柄の市場価格を取得
      const cryptoPrice = await fetchCryptoPrice(crypto.code);
      return {
        ...crypto,
        currentPrice: parseFloat(cryptoPrice.data.last),
      };
    })
  );
};

export const Get = async (
  id: string,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<CryptoModel | null> => {
  const crypto = await prisma.crypto.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
    },
  });
  if (!crypto) throw new Error("Crypto not found");
  
  // 該当銘柄の市場価格を取得
  const cryptoPrice = await fetchCryptoPrice(crypto.code);
  return {
    ...crypto,
    currentPrice: parseFloat(cryptoPrice.data.last),
  };
};

export const Create = async (
  data: CreateCryptoInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<CryptoModel> => {
  const newCrypto = await prisma.crypto.create({
    data: {
      code: data.code,
      getPrice: data.getPrice,
      quantity: data.quantity,
      userId: data.userId,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
    },
  });
  // 該当銘柄の市場価格を取得
  const cryptoPrice = await fetchCryptoPrice(newCrypto.code);
  return {
    ...newCrypto,
    currentPrice: parseFloat(cryptoPrice.data.last),
  };
};

export const Update = async (
  input: UpdateCryptoInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<CryptoModel> => {
  const { id, getPrice, quantity } = input;
  const updatedCrypto = await prisma.crypto.update({
    where: { id },
    data: {
      getPrice,
      quantity,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
    },
  });

  // 該当銘柄の市場価格を取得
  const cryptoPrice = await fetchCryptoPrice(updatedCrypto.code);
  return {
    ...updatedCrypto,
    currentPrice: parseFloat(cryptoPrice.data.last),
  };
};

export const Delete = async (
  id: string,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<CryptoModel> => {
  const deletedCrypto = await prisma.crypto.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
    },
  });

  return {
    ...deletedCrypto,
    currentPrice: 0,
  };
};
