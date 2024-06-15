import prismaClient from "@server/lib/prisma-client";
import { CreateCashInput, UpdateCashInput } from "./input";
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

export const Get = async (id: string): Promise<CashModel | null> => {
  const cash = await prismaClient.cash.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      sector: true,
    },
  });
  if (!cash) throw new Error("Cash not found");
  return cash;
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

export const Update = async (input: UpdateCashInput): Promise<CashModel> => {
  const { id, price } = input;
  const updatedCash = await prismaClient.cash.update({
    where: { id },
    data: {
      price,
    },
    select: {
      id: true,
      name: true,
      price: true,
      sector: true,
    },
  });

  return updatedCash;
};

export const Delete = async (id: string): Promise<CashModel> => {
  const deletedCash = await prismaClient.cash.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      sector: true,
    },
  });

  return deletedCash;
};
