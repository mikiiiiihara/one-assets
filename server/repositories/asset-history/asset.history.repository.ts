import prismaClient from "@server/lib/prisma-client";
import { AssetHistoryModel } from "./asset-history.model";
import { CreateAssetHistoryInput } from "./input";

export const List = async (
  userId: string,
  day?: number
): Promise<AssetHistoryModel[]> => {
  const assetHistories = await prismaClient.assetHistory.findMany({
    where: { userId },
    select: {
      id: true,
      stock: true,
      fund: true,
      crypto: true,
      fixedIncomeAsset: true,
      cash: true,
      createdAt: true,
    },
    // 指定した日数分の直近の値をとる
    take: day != null ? day : undefined,
    orderBy: {
      createdAt: "desc", // 日付が新しい順に並べ替え
    },
  });

  if (assetHistories.length === 0) return [];

  return assetHistories;
};

export const GetLatest = async (
  userId: string
): Promise<AssetHistoryModel | null> => {
  const latestAssetHistory = await prismaClient.assetHistory.findFirst({
    where: { userId },
    orderBy: {
      createdAt: "desc", // 日付が新しい順に並べ替え
    },
    select: {
      id: true,
      stock: true,
      fund: true,
      crypto: true,
      fixedIncomeAsset: true,
      cash: true,
      createdAt: true,
    },
  });

  return latestAssetHistory;
};

export const Create = async (
  input: CreateAssetHistoryInput
): Promise<AssetHistoryModel> => {
  const newCash = await prismaClient.assetHistory.create({
    data: {
      stock: input.stock,
      fund: input.fund,
      crypto: input.crypto,
      fixedIncomeAsset: input.fixedIncomeAsset,
      cash: input.cash,
      userId: input.userId,
    },
    select: {
      id: true,
      stock: true,
      fund: true,
      crypto: true,
      fixedIncomeAsset: true,
      cash: true,
      createdAt: true,
    },
  });

  return newCash;
};
