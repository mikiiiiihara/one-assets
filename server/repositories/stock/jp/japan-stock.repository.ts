import prismaClient from "@server/lib/prisma-client";
import { JapanStockModel } from "./japan-stock.model";
import { CreateJapanStockInput, UpdateJapanStockInput } from "./input";

export const List = async (userId: string): Promise<JapanStockModel[]> => {
  const japanStocks = await prismaClient.japanStock.findMany({
    where: { userId },
    orderBy: {
      code: "asc", // 名前順で取得
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
    },
  });

  if (japanStocks.length === 0) return [];

  // fundsの現在価格を取得する
  const currentPrices = await prismaClient.japanStockPrice.findMany({
    select: {
      name: true,
      code: true,
      price: true,
      dividend: true,
    },
  });

  return japanStocks.map((stock) => {
    const stockPrice = currentPrices.find((price) => price.code === stock.code);
    if (!stockPrice)
      throw new Error(`Japan stock price not found: ${stock.code}`);
    return {
      ...stock,
      name: stockPrice.name,
      currentPrice: stockPrice.price,
      dividends: stockPrice.dividend,
    };
  });
};

export const Create = async (
  data: CreateJapanStockInput
): Promise<JapanStockModel> => {
  const newStock = await prismaClient.japanStock.create({
    data: {
      code: data.code,
      getPrice: data.getPrice,
      quantity: data.quantity,
      sector: data.sector,
      userId: data.userId,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
    },
  });

  // 現在価格を取得する
  const currentPrice = await prismaClient.japanStockPrice.findFirst({
    where: { code: newStock.code },
    select: {
      name: true,
      code: true,
      price: true,
      dividend: true,
    },
  });
  if (!currentPrice) throw new Error("Fund Price not found");
  return {
    ...newStock,
    name: currentPrice.name,
    currentPrice: currentPrice.price,
    dividends: currentPrice.dividend,
  };
};

export const Update = async (
  input: UpdateJapanStockInput
): Promise<JapanStockModel> => {
  const updatedStock = await prismaClient.japanStock.update({
    where: { id: input.id },
    data: {
      getPrice: input.getPrice,
      quantity: input.quantity,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
    },
  });

  // 現在価格を取得する
  const currentPrice = await prismaClient.japanStockPrice.findFirst({
    where: { code: updatedStock.code },
    select: {
      name: true,
      code: true,
      price: true,
      dividend: true,
    },
  });
  if (!currentPrice) throw new Error("Fund Price not found");
  return {
    ...updatedStock,
    name: currentPrice.name,
    currentPrice: currentPrice.price,
    dividends: currentPrice.dividend,
  };
};

export const Delete = async (id: string): Promise<JapanStockModel> => {
  const deletedStock = await prismaClient.japanStock.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
    },
  });
  return {
    ...deletedStock,
    name: "",
    currentPrice: 0,
    dividends: 0,
  };
};
