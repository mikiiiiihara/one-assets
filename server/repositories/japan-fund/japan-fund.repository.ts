import prismaClient from "@server/lib/prisma-client";
import { JapanFundModel } from "./japan-fund.model";
import { CreateJapanFundInput, UpdateJapanFundInput } from "./input";

export const List = async (userId: string): Promise<JapanFundModel[]> => {
  const funds = await prismaClient.japanFund.findMany({
    where: { userId },
    orderBy: {
      name: "asc", // 名前順で取得
    },
    select: {
      id: true,
      name: true,
      code: true,
      getPriceTotal: true,
      getPrice: true,
    },
  });

  if (funds.length === 0) return [];

  // fundsの現在価格を取得する
  const fundPrices = await prismaClient.japanFundPrice.findMany({
    select: {
      code: true,
      price: true,
    },
  });

  return funds.map((fund) => {
    const fundPrice = fundPrices.find((price) => price.code === fund.code);
    if (!fundPrice) throw new Error(`Fund price not found: ${fund.code}`);
    return {
      ...fund,
      currentPrice: fundPrice.price,
    };
  });
};

export const Create = async (
  data: CreateJapanFundInput
): Promise<JapanFundModel> => {
  const newFund = await prismaClient.japanFund.create({
    data: {
      name: data.name,
      code: data.code,
      getPriceTotal: data.getPriceTotal,
      getPrice: data.getPrice,
      userId: data.userId,
    },
    select: {
      id: true,
      name: true,
      code: true,
      getPriceTotal: true,
      getPrice: true,
    },
  });

  // fundsの現在価格を取得する
  const fundPrice = await prismaClient.japanFundPrice.findFirst({
    where: { code: newFund.code },
    select: {
      price: true,
    },
  });
  if (!fundPrice) throw new Error("Fund Price not found");
  return { ...newFund, currentPrice: fundPrice.price };
};

export const Update = async (
  data: UpdateJapanFundInput
): Promise<JapanFundModel> => {
  const updatedFund = await prismaClient.japanFund.update({
    where: { id: data.id },
    data: {
      name: data.name,
      code: data.code,
      getPriceTotal: data.getPriceTotal,
      getPrice: data.getPrice,
    },
    select: {
      id: true,
      name: true,
      code: true,
      getPriceTotal: true,
      getPrice: true,
    },
  });

  // fundsの現在価格を取得する
  const fundPrice = await prismaClient.japanFundPrice.findFirst({
    where: { code: updatedFund.code },
    select: {
      price: true,
    },
  });
  if (!fundPrice) throw new Error("Fund Price not found");
  return { ...updatedFund, currentPrice: fundPrice.price };
};
