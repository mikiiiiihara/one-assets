import prismaClient from "@server/lib/prisma-client";
import { UsStockModel } from "./us-stock.model";
import {
  fetchUsStockDividend,
  fetchUsStockPrices,
} from "@server/adapters/us-stock/us-stock.adapter";
import { stringToDate } from "@server/utils/date";
import { CreateUsStockInput, UpdateUsStockInput } from "./input";

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
          dividends != null
            ? dividends.historical.map((dividend) => ({
                fixedDate: stringToDate(dividend.date),
                paymentDate: stringToDate(dividend.paymentDate),
                price: dividend.dividend,
              }))
            : [],
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
    dividends: usStockDividend.historical.map((dividend) => ({
      fixedDate: stringToDate(dividend.date),
      paymentDate: stringToDate(dividend.paymentDate),
      price: dividend.dividend,
    })),
  };
};

export const Create = async (
  data: CreateUsStockInput
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
    },
  });
  // 株価情報を取得
  const usStockMarketPrices = await fetchUsStockPrices([newStock.code]);
  // 配当情報を取得
  const usStockDividend = await fetchUsStockDividend(newStock.code);
  return {
    ...newStock,
    currentPrice: usStockMarketPrices[0].price,
    priceGets: usStockMarketPrices[0].change,
    currentRate: usStockMarketPrices[0].changesPercentage,
    dividends: usStockDividend.historical.map((dividend) => ({
      fixedDate: stringToDate(dividend.date),
      paymentDate: stringToDate(dividend.paymentDate),
      price: dividend.dividend,
    })),
  };
};

export const Update = async (
  input: UpdateUsStockInput
): Promise<UsStockModel> => {
  const { id, quantity, getPrice, usdjpy } = input;
  const updatedStock = await prismaClient.usStock.update({
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
    },
  });

  // 株価情報を取得
  const usStockMarketPrices = await fetchUsStockPrices([updatedStock.code]);
  // 配当情報を取得
  const usStockDividend = await fetchUsStockDividend(updatedStock.code);
  return {
    ...updatedStock,
    currentPrice: usStockMarketPrices[0].price,
    priceGets: usStockMarketPrices[0].change,
    currentRate: usStockMarketPrices[0].changesPercentage,
    dividends: usStockDividend.historical.map((dividend) => ({
      fixedDate: stringToDate(dividend.date),
      paymentDate: stringToDate(dividend.paymentDate),
      price: dividend.dividend,
    })),
  };
};

export const Delete = async (id: string): Promise<UsStockModel> => {
  // delete the stock
  const deletedUsStock = await prismaClient.usStock.delete({
    where: { id },
    select: {
      id: true,
      code: true,
      getPrice: true,
      quantity: true,
      sector: true,
      usdjpy: true,
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
