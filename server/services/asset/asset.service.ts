import { List as UsStockList } from "@server/repositories/stock/us/us-stock.repository";
import { Asset } from "./asset";
import { List as JapanFundList } from "@server/repositories/japan-fund/japan-fund.repository";
import { List as JapanStockList } from "@server/repositories/stock/jp/japan-stock.repository";
import { List as FixedIncomeAssetList } from "@server/repositories/fixed-income-asset/fixed-income-asset.repository";
import { List as CashList } from "@server/repositories/cash/cash.repository";
import { List as CryptoList } from "@server/repositories/crypto/crypto.repository";
import { buildDividendOfFixedIncomeAsset, buildDividendOfJapanStock } from ".";

export const getAssets = async (userId: string): Promise<Asset[]> => {
  // 全ての資産タイプのデータを並列で取得
  const [
    usStocks,
    japanStocks,
    japanFunds,
    cryptos,
    fixedIncomeAssets,
    cashes,
  ] = await Promise.all([
    UsStockList(userId, true),
    JapanStockList(userId),
    JapanFundList(userId),
    CryptoList(userId),
    FixedIncomeAssetList(userId),
    CashList(userId),
  ]);

  const assets: Asset[] = [];
  // 米国株式
  usStocks.forEach((usStock) => {
    assets.push({
      code: usStock.code,
      name: usStock.code, // TODO: repositoryから持ってきてもいいかもしれない
      currentPrice: usStock.currentPrice,
      currentRate: usStock.currentRate,
      dividends: usStock.dividends,
      getPrice: usStock.getPrice,
      getPriceTotal: usStock.getPrice * usStock.quantity,
      id: usStock.id,
      priceGets: usStock.priceGets,
      quantity: usStock.quantity,
      sector: usStock.sector,
      usdJpy: usStock.usdjpy,
      isNoTax: usStock.isNoTax,
      group: "usStock",
    });
  });
  // 日本株式
  japanStocks.forEach((japanStock) => {
    assets.push({
      code: japanStock.code,
      name: japanStock.name,
      currentPrice: japanStock.currentPrice,
      currentRate: japanStock.currentRate,
      dividends: buildDividendOfJapanStock(japanStock.dividends),
      getPrice: japanStock.getPrice,
      getPriceTotal: japanStock.getPrice * japanStock.quantity,
      id: japanStock.id,
      priceGets: japanStock.priceGets,
      quantity: japanStock.quantity,
      sector: japanStock.sector,
      usdJpy: 1,
      isNoTax: japanStock.isNoTax,
      group: "japanStock",
    });
  });
  // 日本投資信託
  japanFunds.forEach((japanFund) => {
    assets.push({
      code: japanFund.code,
      name: japanFund.name,
      currentPrice: japanFund.currentPrice,
      currentRate: 0,
      dividends: [],
      getPrice: japanFund.getPrice,
      getPriceTotal: japanFund.getPriceTotal,
      id: japanFund.id,
      priceGets: 0,
      quantity: 0,
      sector: "japanFund",
      usdJpy: 0,
      isNoTax: false,
      group: "japanFund",
    });
  });
  //　仮想通貨
  cryptos.forEach((crypto) => {
    assets.push({
      code: crypto.code,
      name: crypto.code,
      currentPrice: crypto.currentPrice,
      currentRate: 0,
      dividends: [],
      getPrice: crypto.getPrice,
      getPriceTotal: crypto.getPrice * crypto.quantity,
      id: crypto.id,
      priceGets: 0,
      quantity: crypto.quantity,
      sector: "crypto",
      usdJpy: 1,
      isNoTax: false,
      group: "crypto",
    });
  });
  // 固定利回り資産
  fixedIncomeAssets.forEach((fixedIncomeAsset) => {
    assets.push({
      code: fixedIncomeAsset.code,
      name: fixedIncomeAsset.code,
      currentPrice: 0,
      currentRate: 0,
      dividends: buildDividendOfFixedIncomeAsset(fixedIncomeAsset),
      getPrice: 0,
      getPriceTotal: fixedIncomeAsset.getPriceTotal,
      id: fixedIncomeAsset.id,
      priceGets: 0,
      quantity: 1,
      sector: "fixedIncomeAsset",
      usdJpy: fixedIncomeAsset.usdjpy,
      isNoTax: false,
      group: "fixedIncomeAsset",
    });
  });
  // 現金
  cashes.forEach((cash) => {
    assets.push({
      code: cash.name,
      name: cash.name,
      currentPrice: 0,
      currentRate: 0,
      dividends: [],
      getPrice: 0,
      getPriceTotal: cash.price,
      id: cash.id,
      priceGets: 0,
      quantity: 1,
      sector: cash.sector,
      usdJpy: 1,
      isNoTax: false,
      group: "cash",
    });
  });
  return assets;
};
