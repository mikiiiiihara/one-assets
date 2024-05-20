import { AssetHistoryModel } from "@server/repositories/asset-history/asset-history.model";
import React from "react";
import { buildAssetHistory } from "./build-asset-history";
import {
  StackedArea,
  StackedAreaType,
} from "@components/atoms/graph/stacked-area";
import { formatDateToJST } from "utils/date";
import { Center } from "@components/atoms/center";
import { TextTitle1 } from "@components/atoms/text/textTitle1";
import { summarizeAssetHistories } from "./summarize-asset-histories";

export type Props = {
  assetHistories: AssetHistoryModel[];
};

const AssetHistory: React.FC<Props> = ({ assetHistories }) => {
  const sortedAssetHistories = assetHistories.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const latestAsset =
    assetHistories.length > 0
      ? buildAssetHistory(sortedAssetHistories[sortedAssetHistories.length - 1])
      : 0;
  const prevLatestAsset =
    assetHistories.length > 1
      ? buildAssetHistory(sortedAssetHistories[sortedAssetHistories.length - 2])
      : 0;

  // graphのseriesデータを計算
  const series: StackedAreaType[] = [
    {
      name: "資産総額",
      data: sortedAssetHistories.map((asset) => buildAssetHistory(asset)),
    },
  ];
  // asset別のデータを計算
  const detailSeries = summarizeAssetHistories(sortedAssetHistories);

  // 前日比の差分
  const priceGap = latestAsset - prevLatestAsset;
  // 前日比(%)の計算
  const priceRate = (100 * priceGap) / prevLatestAsset;
  const priceRateBalance = priceRate > 0 ? "text-plus" : "text-minus";
  const balanceIcon = priceRate > 0 ? "+" : "";
  const displayPriceRate = isNaN(priceRate)
    ? "-"
    : (Math.round(priceRate * 100) / 100).toLocaleString();

  return (
    <Center>
      <TextTitle1>資産推移</TextTitle1>
      <h1>現在の資産総額：¥{latestAsset.toLocaleString()}</h1>
      <p className={priceRateBalance}>
        前日比:¥{balanceIcon}
        {priceGap.toLocaleString()}({balanceIcon}
        {displayPriceRate}%)
      </p>
      <StackedArea
        xData={sortedAssetHistories.map((asset) =>
          formatDateToJST(asset.createdAt)
        )}
        series={series}
        themeColor={"rgb(82, 231, 171)"}
        background="#343a40"
      />
      <StackedArea
        xData={sortedAssetHistories.map((asset) =>
          formatDateToJST(asset.createdAt)
        )}
        series={detailSeries}
        background="#343a40"
      />
    </Center>
  );
};

export default AssetHistory;
