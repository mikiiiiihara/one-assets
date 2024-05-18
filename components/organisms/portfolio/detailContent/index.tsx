import React, { FC, useCallback, useState } from "react";
import { AssetsSummary, Detail } from "../types";
import { Graph } from "./graph";
import { PrimaryButton } from "@components/molecules/primary-button";
import { Table } from "./table";

type Props = {
  details: Detail[];
  assetsSummary: AssetsSummary;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

const Component: FC<Props> = ({ details }) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.summary);
  const changeDisplayToSummary = useCallback(
    () => setDisplayMode(DISPLAY_MODE.summary),
    []
  );
  const changeDisplayToDetail = useCallback(
    () => setDisplayMode(DISPLAY_MODE.detail),
    []
  );
  return (
    <>
      <div className="m-5 flex justify-center">
        <PrimaryButton
          content="ポートフォリオ"
          notSelected={displayMode !== DISPLAY_MODE.summary}
          onClick={changeDisplayToSummary}
        />
        <PrimaryButton
          content="保有銘柄一覧"
          notSelected={displayMode !== DISPLAY_MODE.detail}
          onClick={changeDisplayToDetail}
        />
      </div>
      {/* {displayMode === DISPLAY_MODE.summary ? (
        <Summary usStockDetail={usStockDetail} />
      ) : (
        <AssetDetails usStockSummary={usStockSummary} />
      )} */}
      {displayMode === DISPLAY_MODE.summary ? (
        <Graph details={details} />
      ) : (
        <Table details={details} selectedFx="¥" />
      )}
    </>
  );
};
Component.displayName = "DetailContent";
export const DetailContent = React.memo(Component);
