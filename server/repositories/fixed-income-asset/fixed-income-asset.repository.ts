import prismaClient from "@server/lib/prisma-client";
import { CreateFixedIncomeAssetInput, UpdateFixedIncomeAssetInput } from "./input";
import { FixedIncomeAssetModel } from "./fixed-income-asset.model";
import { Prisma } from "@prisma/client";

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

export const Get = async (
  id: string,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<FixedIncomeAssetModel | null> => {
  const asset = await prisma.fixedIncomeAsset.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      getPriceTotal: true,
      dividendRate: true,
      usdjpy: true,
      paymentMonth: true,
    },
  });
  if (!asset) throw new Error("Fixed income asset not found");
  return asset;
};

export const Create = async (
  data: CreateFixedIncomeAssetInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<FixedIncomeAssetModel> => {
  const newAsset = await prisma.fixedIncomeAsset.create({
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

export const Update = async (
  input: UpdateFixedIncomeAssetInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<FixedIncomeAssetModel> => {
  const { id, getPriceTotal, dividendRate, usdjpy, paymentMonth } = input;
  const updatedAsset = await prisma.fixedIncomeAsset.update({
    where: { id },
    data: {
      getPriceTotal,
      dividendRate,
      usdjpy,
      paymentMonth,
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

  return updatedAsset;
};

export const Delete = async (
  id: string,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<FixedIncomeAssetModel> => {
  const deletedAsset = await prisma.fixedIncomeAsset.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      getPriceTotal: true,
      dividendRate: true,
      usdjpy: true,
      paymentMonth: true,
    },
  });

  return deletedAsset;
};
