import prismaClient from "@server/lib/prisma-client";
import { JapanStockModel } from "./japan-stock.model";
import { CreateJapanStockInput, UpdateJapanStockInput } from "./input";
import { fetchJapanStockPrices } from "@server/adapters/yahoo-finance/stock/stock.adapter";

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
    },
  });

  if (japanStocks.length === 0) return [];

  const result = await Promise.all(
    japanStocks.map(async (stock) => {
      const currentPrice = await fetchJapanStockPrices(stock.code);
      return {
        ...stock,
        currentPrice,
      };
    })
  );

  return result;
};

export const Create = async (
  data: CreateJapanStockInput
): Promise<JapanStockModel> => {
  const newStock = await prismaClient.japanStock.create({
    data: {
      code: data.code,
      name: data.name,
      getPrice: data.getPrice,
      quantity: data.quantity,
      dividends: data.dividends,
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
    },
  });

  const currentMarketPrice = await fetchJapanStockPrices(newStock.code);
  return {
    ...newStock,
    currentPrice: currentMarketPrice,
  };
};

export const Update = async (
  input: UpdateJapanStockInput
): Promise<JapanStockModel> => {
  const updatedStock = await prismaClient.japanStock.update({
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
    },
  });

  const currentMarketPrice = await fetchJapanStockPrices(updatedStock.code);
  return {
    ...updatedStock,
    currentPrice: currentMarketPrice,
  };
};

export const Delete = async (id: string): Promise<JapanStockModel> => {
  const deletedStock = await prismaClient.japanStock.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      getPrice: true,
      quantity: true,
      dividends: true,
      sector: true,
    },
  });
  return {
    ...deletedStock,
    currentPrice: 0,
  };
};
