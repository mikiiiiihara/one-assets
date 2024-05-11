import prismaClient from "@server/lib/prisma-client";
import { CreateFixedIncomeAssetInput } from "./input";
import { FixedIncomeAssetModel } from "./fixed-income-asset.model";

export const List = async (
  userId: string
): Promise<FixedIncomeAssetModel[]> => {
  const assets = await prismaClient.fixedIncomeAsset.findMany({
    where: { userId },
    orderBy: {
      code: "asc", // コード順で取得
    },
    select: {
      id: true,
      code: true,
      getPriceTotal: true,
      dividendRate: true,
      usdjpy: true,
      paymentMonth: true,
    },
  });

  if (assets.length === 0) return [];

  return assets;
};

export const Create = async (
  data: CreateFixedIncomeAssetInput
): Promise<FixedIncomeAssetModel> => {
  const newAsset = await prismaClient.fixedIncomeAsset.create({
    data: {
      code: data.code,
      getPriceTotal: data.getPriceTotal,
      dividendRate: data.dividendRate,
      usdjpy: data.usdjpy,
      paymentMonth: data.paymentMonth,
      userId: data.userId,
    },
    select: {
      id: true,
      code: true,
      getPriceTotal: true,
      dividendRate: true,
      usdjpy: true,
      paymentMonth: true,
    },
  });

  return newAsset;
};
