import { Asset } from "@server/services/asset/asset";
import { AssetsSummary, Detail } from "./types";
import { Dividend } from "@server/repositories/stock/us/us-stock.model";

export const summarizeAllAssets = (
  asset: Asset[],
  fx: number
): AssetsSummary => {
  let details: Detail[] = new Array();
  let getPriceSum = 0;
  let priceSum = 0;
  let dividendSum = 0;
  for (let i = 0; i < asset?.length; i++) {
    let value: Detail;
    switch (asset[i].group) {
      case "usStock":
        value = calculateUsStock(asset[i], fx);
        break;
      case "japanStock":
        value = calculateJapanStock(asset[i]);
        break;
      case "japanFund":
        value = calculateJapanFund(asset[i]);
        break;
      case "crypto":
        value = calculateCryptos(asset[i]);
        break;
      case "fixedIncomeAsset":
        value = calculateFixedIncomeAsset(asset[i]);
        break;
      default:
        value = calculateCash(asset[i], fx);
    }
    const { sumOfGetPrice, sumOfPrice, sumOfDividend } = value;
    // 合計値に加算
    getPriceSum += sumOfGetPrice;
    priceSum += sumOfPrice;
    dividendSum += sumOfDividend;

    details.push(value);
  }
  // 時価総額の降順にソート
  details.sort(function (a, b) {
    if (a.sumOfPrice > b.sumOfPrice) return -1;
    if (a.sumOfPrice < b.sumOfPrice) return 1;
    return 0;
  });
  const assetsSummary: AssetsSummary = {
    details,
    getPriceTotal: Math.round(getPriceSum * 10) / 10,
    priceTotal: Math.round(priceSum * 10) / 10,
    dividendTotal: Math.round(dividendSum * 10) / 10,
  };
  return assetsSummary;
};

// 米国株式のサマリーを計算
const calculateUsStock = (asset: Asset, fx: number): Detail => {
  const { usdJpy, quantity } = asset;
  const getPrice = asset.getPrice * usdJpy;
  const price = asset.currentPrice * fx;
  const priceRate = asset.currentRate;
  const dividendAmount = calculateTotalDividendPrice(asset.dividends) * fx;
  const taxRate = asset.isNoTax ? 0.9 : 0.71;
  const sumOfDividend = quantity * (dividendAmount * taxRate);
  const sumOfGetPrice = Math.round(quantity * getPrice * 10) / 10;
  const sumOfPrice = Math.round(quantity * price * 10) / 10;
  return {
    ...asset,
    quantity,
    getPrice,
    price,
    priceRate,
    dividend: asset.dividends.map((dividend) => {
      return {
        ...dividend,
        price: Math.round(dividend.price * fx * taxRate * 100) / 100,
      };
    }),
    sumOfDividend: Math.round(sumOfDividend * 100) / 100,
    dividendRate:
      Math.round(((dividendAmount * taxRate * 100) / getPrice) * 100) / 100,
    usdJpy,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((quantity * price - quantity * getPrice) * 10) / 10,
    balanceRate:
      Math.round(
        ((quantity * price - quantity * getPrice) / (quantity * getPrice)) *
          100 *
          10
      ) / 10,
    group: "usStock",
  };
};

// 日本株式のサマリーを計算
const calculateJapanStock = (asset: Asset): Detail => {
  const { quantity, getPrice } = asset;
  const price = asset.currentPrice;
  const priceRate = asset.currentRate;
  // TODO: 配当金額を計算
  const dividendAmount = calculateTotalDividendPrice(asset.dividends);
  const taxRate = asset.isNoTax ? 1 : 0.8;
  const sumOfDividend = quantity * (dividendAmount * taxRate);
  const sumOfGetPrice = Math.round(quantity * getPrice * 10) / 10;
  const sumOfPrice = Math.round(quantity * price * 10) / 10;
  return {
    ...asset,
    quantity,
    getPrice,
    price,
    priceRate,
    dividend: asset.dividends.map((dividend) => {
      return {
        ...dividend,
        price: Math.round(dividend.price * taxRate * 100) / 100,
      };
    }),
    sumOfDividend: Math.round(sumOfDividend * 100) / 100,
    dividendRate:
      Math.round(((dividendAmount * taxRate * 100) / getPrice) * 100) / 100,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((quantity * price - quantity * getPrice) * 10) / 10,
    balanceRate:
      Math.round(
        ((quantity * price - quantity * getPrice) / (quantity * getPrice)) *
          100 *
          10
      ) / 10,
    group: "japanStock",
  };
};

// 日本投資信託のサマリーを計算
const calculateJapanFund = (asset: Asset): Detail => {
  const { getPrice, getPriceTotal, currentPrice } = asset;
  const priceRate = asset.currentRate;

  // 取得時総額、現在価格、取得価格から、評価総額を逆算
  const sumOfGetPrice = getPriceTotal;
  const sumOfPrice = (getPriceTotal * currentPrice) / getPrice;
  return {
    ...asset,
    getPrice,
    price: currentPrice,
    priceRate,
    dividend: [],
    sumOfDividend: 0,
    dividendRate: 0,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((sumOfPrice - getPriceTotal) * 10) / 10,
    balanceRate:
      Math.round(((sumOfPrice - getPriceTotal) / sumOfGetPrice) * 100 * 10) /
      10,
    group: "japanFund",
  };
};

// 仮想通貨のサマリーを計算
const calculateCryptos = (asset: Asset): Detail => {
  const { quantity, getPrice, currentPrice } = asset;
  const priceRate = asset.currentRate;

  const sumOfGetPrice = Math.round(quantity * getPrice * 10) / 10;
  // 合計評価額
  const sumOfPrice = Math.round(quantity * currentPrice * 10) / 10;
  return {
    ...asset,
    quantity,
    getPrice,
    price: currentPrice,
    priceRate,
    dividend: [],
    sumOfDividend: 0,
    dividendRate: 0,
    usdJpy: 1,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((sumOfPrice - sumOfGetPrice) * 10) / 10,
    balanceRate:
      Math.round(((sumOfPrice - sumOfGetPrice) / sumOfGetPrice) * 100 * 10) /
      10,
    group: "crypto",
  };
};

// 固定利回り資産のサマリーを計算
const calculateFixedIncomeAsset = (asset: Asset): Detail => {
  const { getPrice, getPriceTotal, currentPrice } = asset;
  const priceRate = asset.currentRate;
  const dividendAmount = calculateTotalDividendPrice(asset.dividends);
  const sumOfDividend = dividendAmount;
  return {
    ...asset,
    getPrice,
    price: currentPrice,
    priceRate,
    dividend: asset.dividends,
    sumOfDividend,
    dividendRate: (100 * dividendAmount) / getPriceTotal,
    sumOfGetPrice: getPriceTotal,
    sumOfPrice: getPriceTotal,
    balance: 0,
    balanceRate: 0,
    group: "fixedIncomeAsset",
  };
};

// 現金のサマリーを計算
const calculateCash = (asset: Asset, fx: number): Detail => {
  const { getPriceTotal, currentPrice, sector } = asset;
  const priceRate = asset.currentRate;
  const sumOfDividend = 0;
  return {
    ...asset,
    price: currentPrice,
    priceRate,
    dividend: [],
    sumOfDividend,
    dividendRate: 0,
    sector,
    sumOfGetPrice: sector == "JPY" ? getPriceTotal : getPriceTotal * fx,
    sumOfPrice: sector == "JPY" ? getPriceTotal : getPriceTotal * fx,
    balance: 0,
    balanceRate: 0,
    group: "cash",
  };
};

export const calculateTotalDividendPrice = (dividends: Dividend[]): number => {
  return dividends.reduce((total, dividend) => total + dividend.price, 0);
};
