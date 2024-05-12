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
      <MemoizedPie
        pieData={displayMode === DISPLAY_MODE.ticker ? pieData : sectorData}
        themeColor={themeDefault}
        background="black"
      />
    </>
  );
};

Component.displayName = "Graph";
export const Graph = React.memo(Component);
