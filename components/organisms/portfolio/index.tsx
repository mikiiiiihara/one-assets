import { Center } from "@components/atoms/center";
import { TextTitle1 } from "@components/atoms/text/textTitle1";
import React, { useCallback, useMemo, useState } from "react";
import { summarizeAllAssets } from "./summarize-all-assets";
import { Empty } from "@components/atoms/empty";
import { DetailContent } from "./detailContent";
import { useAssetsContext } from "contexts/assetsContext";
import { Loading } from "@components/atoms/loading";
import { PrimaryButton } from "@components/molecules/primary-button";
import { Modal } from "@components/atoms/modal";
import { CreateForms } from "./create-forms";
import { Button } from "@components/atoms/button";
import { StackedColumn } from "@components/atoms/graph/stacked-column";
import { convertDetailsToDivData } from "./calculate-dividends-for-graph";

export type Props = {
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

const Portfolio: React.FC<Props> = ({ currentUsdJpy }) => {
  const themeDefault = [
    "#007bff",
    "#ff3333",
    "#ffd700",
    "#00d56a",
    "orange",
    "#00ced1",
    "#6495ED",
    "#ff5192",
    "#ffff00",
    "#66cc99",
    "#ff9966",
  ];
  const { assets, isLoading, error } = useAssetsContext();
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroups>({
    usStock: true,
    japanStock: true,
    japanFund: true,
    crypto: true,
    fixedIncomeAsset: true,
    cash: true,
  });
  // モーダル表示切り替え用
  const [modalState, setModalState] = useState(false);
  const changeModal = () => {
    setModalState(!modalState);
  };

  // 保有株式情報をグラフ用に加工
  const assetsSummary = useMemo(() => {
    const isUsStockOnly =
      selectedGroups.usStock &&
      !selectedGroups.japanStock &&
      !selectedGroups.japanFund &&
      !selectedGroups.crypto &&
      !selectedGroups.fixedIncomeAsset &&
      !selectedGroups.cash;

    const isJapanStockOnly =
      selectedGroups.japanStock &&
      !selectedGroups.usStock &&
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
      .map((asset) => {
        let sector = asset.sector;
        if (!isUsStockOnly && asset.group == "usStock") sector = "usStock";
        if (!isJapanStockOnly && asset.group == "japanStock")
          sector = "japanStock";
        return {
          ...asset,
          sector,
        };
      });
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
  const divData = convertDetailsToDivData(details);
  if (isLoading) return <Loading />;
  if (error) return <Center>Error: {error}</Center>;
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
      <div className="m-2 flex justify-center">
        <PrimaryButton content="銘柄を追加" onClick={changeModal} />
        {modalState ? (
          <Modal>
            <CreateForms currentUsdJpy={currentUsdJpy} />
            <Button
              className="bg-gray-500 text-white m-auto"
              onClick={changeModal}
            >
              閉じる
            </Button>
          </Modal>
        ) : (
          <></>
        )}
      </div>
      <TextTitle1>配当支払い予定</TextTitle1>
      <StackedColumn
        divData={divData}
        themeColor={themeDefault}
        background="rgba(10, 10, 10, 0.95)"
      />
    </Center>
  );
};

export default Portfolio;
