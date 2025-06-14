import prismaClient from "@server/lib/prisma-client";
import { Dividend, UsStockModel } from "./us-stock.model";
import {
  fetchUsStockDividend,
  fetchUsStockPrices,
} from "@server/adapters/us-stock/us-stock.adapter";
import { UsStockDividendItem } from "@server/adapters/us-stock/responses";
import { stringToDate } from "@server/utils/date";
import { CreateUsStockInput, UpdateUsStockInput } from "./input";
import { Prisma } from "@prisma/client";

export const List = async (
  userId: string,
  isIncludedDividend?: boolean
): Promise<UsStockModel[]> => {
  const stocks = await prismaClient.usStock.findMany({
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
      isNoTax: true,
    },
  });
  if (stocks.length === 0) return [];
  // 株価情報を取得
  const usStockMarketPrices = await fetchUsStockPrices(
    stocks.map((stock) => stock.code)
  );
  // 保有株式情報に現在のマーケットデータを付与して返却する
  return await Promise.all(
    stocks.map(async (stock) => {
      // 該当銘柄の配当情報を取得
      let dividends = null;
      if (isIncludedDividend)
        dividends = await fetchUsStockDividend(stock.code);
      const marketPrice = usStockMarketPrices.find(
        (usStockMarketPrice) => usStockMarketPrice.symbol == stock.code
      );
      if (!marketPrice) {
        throw new Error("Market price not found");
      }
      return {
        ...stock,
        currentPrice: marketPrice.price,
        priceGets: marketPrice.change,
        currentRate: marketPrice.changesPercentage,
        dividends:
          dividends != null ? mapAnnualDividends(dividends.historical) : [],
      };
    })
  );
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
      isNoTax: true,
    },
  });
  if (!stock) throw new Error("Stock not found");
  // 株価情報を取得
  const usStockMarketPrices = await fetchUsStockPrices([stock.code]);
  // 配当情報を取得
  const usStockDividend = await fetchUsStockDividend(stock.code);
  return {
    ...stock,
    currentPrice: usStockMarketPrices[0].price,
    priceGets: usStockMarketPrices[0].change,
    currentRate: usStockMarketPrices[0].changesPercentage,
    dividends: mapAnnualDividends(usStockDividend.historical),
  };
};

export const Create = async (
  data: CreateUsStockInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<
  Omit<UsStockModel, "currentPrice" | "priceGets" | "currentRate" | "dividends">
> => {
  const newStock = await prisma.usStock.create({
    data: {
      code: data.code,
      getPrice: data.getPrice,
      quantity: data.quantity,
      sector: data.sector,
      usdjpy: data.usdjpy,
      isNoTax: data.isNoTax,
      userId: data.userId,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
      isNoTax: true,
    },
  });
  return newStock;
};

export const Update = async (
  input: UpdateUsStockInput,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<
  Omit<UsStockModel, "currentPrice" | "priceGets" | "currentRate" | "dividends">
> => {
  const { id, quantity, getPrice, usdjpy } = input;
  const updatedStock = await prisma.usStock.update({
    where: { id },
    data: {
      quantity,
      getPrice,
      usdjpy,
    },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
      isNoTax: true,
    },
  });

  return updatedStock;
};

export const Delete = async (
  id: string,
  prisma: Prisma.TransactionClient | typeof prismaClient = prismaClient
): Promise<UsStockModel> => {
  // delete the stock
  const deletedUsStock = await prisma.usStock.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
      isNoTax: true,
    },
  });
  return {
    ...deletedUsStock,
    currentPrice: 0,
    priceGets: 0,
    currentRate: 0,
    dividends: [],
  };
};

/**
 * 株価情報と配当情報を取得して、UsStockModelの完全な情報を返す
 */
export const FetchMarketData = async (
  stock: Omit<
    UsStockModel,
    "currentPrice" | "priceGets" | "currentRate" | "dividends"
  >
): Promise<UsStockModel> => {
  // 株価情報を取得
  const usStockMarketPrices = await fetchUsStockPrices([stock.code]);
  // 配当情報を取得
  const usStockDividend = await fetchUsStockDividend(stock.code);
  return {
    ...stock,
    currentPrice: usStockMarketPrices[0].price,
    priceGets: usStockMarketPrices[0].change,
    currentRate: usStockMarketPrices[0].changesPercentage,
    dividends: mapAnnualDividends(usStockDividend.historical),
  };
};

/**
 * 1年あたりの配当を計算する
 */
const mapAnnualDividends = (dividends: UsStockDividendItem[]): Dividend[] => {
  const currentDate = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  return dividends
    .map((dividend) => ({
      fixedDate: stringToDate(dividend.date),
      paymentDate: stringToDate(dividend.paymentDate),
      price: dividend.dividend,
    }))
    .filter(
      (dividend) =>
        dividend.fixedDate >= oneYearAgo && dividend.fixedDate <= currentDate
    );
};
