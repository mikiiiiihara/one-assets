import prismaClient from "@server/lib/prisma-client";
import { UsStockModel } from "./us-stock.model";

export const List = async (userId: string): Promise<UsStockModel[]> => {
  return await prismaClient.usStock.findMany({
    where: { userId },
    orderBy: {
      code: "asc", //アルファベット順で取得
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
      userId: true,
    },
  });
};

export const Get = async (id: string): Promise<UsStockModel | null> => {
  const stock = await prismaClient.usStock.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
      userId: true,
    },
  });
  if (!stock) throw new Error("Stock not found");
  return stock;
};

export const Create = async (
  data: Omit<UsStockModel, "id" | "createdAt" | "updatedAt">
): Promise<UsStockModel> => {
  const newStock = await prismaClient.usStock.create({
    data: {
      code: data.code,
      getPrice: data.getPrice,
      quantity: data.quantity,
      sector: data.sector,
      usdjpy: data.usdjpy,
      userId: data.userId,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
      userId: true,
    },
  });
  return newStock;
};
