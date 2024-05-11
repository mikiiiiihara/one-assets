import React, { FC } from "react";
import { AssetsSummary, Detail } from "../types";
import { Graph } from "./graph";

type Props = {
  displayMode: string;
  details: Detail[];
  assetsSummary: AssetsSummary;
};

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};

const Component: FC<Props> = ({ displayMode, details, assetsSummary }) => {
  return (
    <>
      {/* {displayMode === DISPLAY_MODE.summary ? (
        <Summary usStockDetail={usStockDetail} />
      ) : (
        <AssetDetails usStockSummary={usStockSummary} />
      )} */}
      <Graph details={details} />
    </>
  );
};
Component.displayName = "DetailContent";
export const DetailContent = React.memo(Component);
