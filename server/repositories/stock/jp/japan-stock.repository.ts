import prismaClient from "@server/lib/prisma-client";
import { JapanStockModel } from "./japan-stock.model";
import { CreateJapanStockInput, UpdateJapanStockInput } from "./input";
import { fetchJapanStockPrices } from "@server/adapters/yahoo-finance/stock/stock.adapter";
import { Prisma } from "@prisma/client";

export const List = async (userId: string): Promise<JapanStockModel[]> => {
  const japanStocks = await prismaClient.japanStock.findMany({
    where: { userId },
    orderBy: {
      code: "asc", // 名前順で取得
    },
    select: {
      id: true,
      code: true,
      name: true,
      getPrice: true,
      quantity: true,
      dividends: true,
      sector: true,
      isNoTax: true,
    },
  });

  if (japanStocks.length === 0) return [];

  const result = await Promise.all(
    japanStocks.map(async (stock) => {
      const { currentPrice, priceGets, currentRate } =
        await buildJapanStockMarketPrice(stock.code);
      return {
        ...stock,
        currentPrice,
        priceGets,
        currentRate,
      };
    })
  );

  return result;
};

export const Create = async (
  data: CreateJapanStockInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<
  Omit<JapanStockModel, "currentPrice" | "priceGets" | "currentRate">
> => {
  const newStock = await prisma.japanStock.create({
    data: {
      code: data.code,
      name: data.name,
      getPrice: data.getPrice,
      quantity: data.quantity,
      dividends: data.dividends,
      isNoTax: data.isNoTax,
      sector: data.sector,
      userId: data.userId,
    },
    select: {
      id: true,
      code: true,
      name: true,
      getPrice: true,
      quantity: true,
      dividends: true,
      sector: true,
      isNoTax: true,
    },
  });

  return newStock;
};

export const Update = async (
  input: UpdateJapanStockInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<
  Omit<JapanStockModel, "currentPrice" | "priceGets" | "currentRate">
> => {
  const updatedStock = await prisma.japanStock.update({
    where: { id: input.id },
    data: {
      name: input.name,
      getPrice: input.getPrice,
      quantity: input.quantity,
      dividends: input.dividends,
    },
    select: {
      id: true,
      code: true,
      name: true,
      getPrice: true,
      quantity: true,
      dividends: true,
      sector: true,
      isNoTax: true,
    },
  });

  return updatedStock;
};

export const Delete = async (
  id: string,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<JapanStockModel> => {
  const deletedStock = await prisma.japanStock.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      getPrice: true,
      quantity: true,
      dividends: true,
      sector: true,
      isNoTax: true,
    },
  });
  return {
    ...deletedStock,
    currentPrice: 0,
    priceGets: 0,
    currentRate: 0,
  };
};

const buildJapanStockMarketPrice = async (code: string) => {
  const japanStockPrice = await fetchJapanStockPrices(code);
  const priceGets = japanStockPrice.price - japanStockPrice.previousClosePrice;
  return {
    currentPrice: japanStockPrice.price,
    priceGets,
    currentRate: (priceGets / japanStockPrice.previousClosePrice) * 100,
  };
};

/**
 * 株価情報を取得して、JapanStockModelの完全な情報を返す
 */
export const FetchMarketData = async (
  stock: Omit<JapanStockModel, "currentPrice" | "priceGets" | "currentRate">
): Promise<JapanStockModel> => {
  const marketPrice = await buildJapanStockMarketPrice(stock.code);
  return {
    ...stock,
    ...marketPrice,
  };
};
