import prismaClient from "@server/lib/prisma-client";
import { CreateCashInput } from "./input";
import { CashModel } from "./cash.model";

export const List = async (userId: string): Promise<CashModel[]> => {
  const cachData = await prismaClient.cash.findMany({
    where: { userId },
    orderBy: {
      name: "asc", // 名前順で取得
    },
    select: {
      id: true,
      name: true,
      price: true,
      sector: true,
    },
  });

  if (cachData.length === 0) return [];

  return cachData;
};
export const Create = async (data: CreateCashInput): Promise<CashModel> => {
  const newCash = await prismaClient.cash.create({
    data: {
      name: data.name,
      price: data.price,
      sector: data.sector,
      userId: data.userId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      sector: true,
    },
  });

  return newCash;
};
