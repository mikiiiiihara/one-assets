import prismaClient from "@server/lib/prisma-client";
import { CreateCryptoInput } from "./input";
import { CryptoModel } from "./crypto.model";
import { fetchCryptoPrice } from "@server/adapters/crypto-price/crypto-price.adapter";

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

export const Create = async (data: CreateCryptoInput): Promise<CryptoModel> => {
  const newCrypto = await prismaClient.crypto.create({
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
