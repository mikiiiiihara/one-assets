import React, { FC, useCallback, useMemo, useState } from "react";
import { Detail } from "../../types";
import { Pie, PieData } from "@components/atoms/graph/pie";
import { calculateTickerPie } from "./calculate-ticker-pie";
import { calculateSectors } from "./calculate-sectors";
import { PrimaryButton } from "@components/molecules/primary-button";

const DISPLAY_MODE = {
  ticker: "ticker",
  sector: "sector",
};

type Props = {
  details: Detail[];
};

const MemoizedPie = React.memo(Pie); // Pieコンポーネントをメモ化

const Component: FC<Props> = ({ details }) => {
  const themeDefault = [
    "#1ECC9E", // Primary green
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#EC4899", // Pink
    "#10B981", // Emerald
    "#F97316", // Orange
    "#6366F1", // Indigo
    "#84CC16", // Lime
  ];
  // 画面表示
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.sector);
  const changeDisplayToTicker = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.ticker);
  }, []);

  const changeDisplayToSector = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.sector);
  }, []);

  const pieData = useMemo(() => calculateTickerPie(details), [details]);
  const sectorData: PieData[] = useMemo(
    () => calculateSectors(details),
    [details]
  );
  return (
    <>
      <div className="m-5 flex justify-center">
        <PrimaryButton
          content="銘柄別"
          notSelected={displayMode !== DISPLAY_MODE.ticker}
          onClick={changeDisplayToTicker}
        />
        <PrimaryButton
          content="セクター別"
          notSelected={displayMode !== DISPLAY_MODE.sector}
          onClick={changeDisplayToSector}
        />
      </div>
      <div className="card p-6">
        <MemoizedPie
          pieData={displayMode === DISPLAY_MODE.ticker ? pieData : sectorData}
          themeColor={themeDefault}
          background="transparent"
        />
      </div>
    </>
  );
};

Component.displayName = "Graph";
export const Graph = React.memo(Component);
