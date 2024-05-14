import React, { useEffect, useState } from "react";
import { Detail } from "../../types";
import { AssetPanel } from "./panels";

type Props = {
  details: Detail[];
  selectedFx: string;
};

export const Component: React.FC<Props> = ({ details, selectedFx }) => {
  const [tickerList, setTickerList] = useState(details);

  useEffect(() => {
    setTickerList(details);
  }, [selectedFx, details]);

  return (
    <>
      <AssetPanel assetDetails={tickerList} currency={selectedFx} />
      <div className="clear-both"></div>
    </>
  );
};

Component.displayName = "Table";
export const Table = React.memo(Component);
