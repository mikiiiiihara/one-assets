import { Center } from "@components/atoms/center";
import { TextTitle1 } from "@components/atoms/text/textTitle1";
import { Asset } from "@server/services/asset/asset";
import React, { useCallback, useMemo, useState } from "react";
import { summarizeAllAssets } from "./summarize-all-assets";
import { Empty } from "@components/atoms/empty";
import { DetailContent } from "./detailContent";

export type Props = {
  assets: Asset[];
  currentUsdJpy: number;
};

type SelectedGroups = {
  [key: string]: boolean;
  usStock: boolean;
  japanStock: boolean;
  japanFund: boolean;
  crypto: boolean;
  fixedIncomeAsset: boolean;
  cash: boolean;
};

export const ASSET_DISPLAY_MODE = {
  usStock: "米国株",
  japanStock: "日本株",
  japanFund: "日本投資信託",
  crypto: "暗号通貨",
  fixedIncomeAsset: "固定利回り資産",
  cash: "現金",
};

const Portfolio: React.FC<Props> = ({ assets, currentUsdJpy }) => {
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroups>({
    usStock: true,
    japanStock: true,
    japanFund: true,
    crypto: true,
    fixedIncomeAsset: true,
    cash: true,
  });

  // 保有株式情報をグラフ用に加工
  const assetsSummary = useMemo(() => {
    const isStockOnly =
      selectedGroups.usStock &&
      !selectedGroups.japanStock &&
      !selectedGroups.japanFund &&
      !selectedGroups.crypto &&
      !selectedGroups.fixedIncomeAsset &&
      !selectedGroups.cash;
    const filteredAssets = assets
      .filter((asset) => selectedGroups[asset.group])
      // usStockのみ選択されている場合はsectorをそのまま使用、それ以外はusStockに変更
      // TODO: 日本株が入った場合の条件分岐も考えたい
      // 米国株のみの場合=セクター名そのまま使う
      // 日本株のみの場合=セクター名そのまま使う
      // 日本株と米国株の場合=セクター名そのまま使う
      .map((asset) => ({
        ...asset,
        sector:
          isStockOnly || asset.group != "usStock" ? asset.sector : "usStock",
      }));
    return summarizeAllAssets(filteredAssets, currentUsdJpy);
  }, [assets, currentUsdJpy, selectedGroups]);

  const { details, priceTotal, getPriceTotal, dividendTotal } = assetsSummary;

  const balanceTotal = Math.round((priceTotal - getPriceTotal) * 10) / 10;
  const balanceRateTotal = ((balanceTotal / getPriceTotal) * 100).toFixed(2);
  const balanceRateClass =
    Number(balanceRateTotal) > 0
      ? "text-plus"
      : Number(balanceRateTotal) < 0
        ? "text-minus"
        : "";

  // チェックボックスの変更をハンドルする関数
  const handleCheckboxChange = useCallback((event: any) => {
    const { name, checked } = event.target;
    setSelectedGroups((prev) => ({ ...prev, [name]: checked }));
  }, []);
  // チェックボックスのレンダリング
  const renderCheckboxes = () => {
    const groupJapaneseName: { [key: string]: string } = ASSET_DISPLAY_MODE;

    return (
      <div>
        {Object.entries(selectedGroups).map(([group, isSelected]) => (
          <label key={group}>
            <input
              type="checkbox"
              name={group}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            {groupJapaneseName[group]}
          </label>
        ))}
      </div>
    );
  };
  return (
    <Center>
      <div>
        <TextTitle1>保有株式総額¥:{priceTotal.toLocaleString()}</TextTitle1>
        <p className={balanceRateClass}>
          損益¥:{balanceTotal.toLocaleString()}（
          {isNaN(Number(balanceRateTotal)) ? 0 : balanceRateTotal}
          %）
        </p>
        <p>（USDJPY: {currentUsdJpy}）</p>
        <p>一年あたり配当総額：¥{dividendTotal.toLocaleString()}</p>
        {renderCheckboxes()}
        {details.length > 0 ? (
          <DetailContent details={details} assetsSummary={assetsSummary} />
        ) : (
          <Empty />
        )}
      </div>
    </Center>
  );
};

export default Portfolio;
