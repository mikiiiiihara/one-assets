import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { UpdateUsStockForm } from "./updateUsStockForm";
import { UpdateCashForm } from "./updateCashForm";
import { UpdateJapanFundForm } from "./updateJapanFundForm";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ detail, currentUsdJpy }) => {
  switch (detail.group) {
    case "usStock":
      return (
        <UpdateUsStockForm detail={detail} currentUsdJpy={currentUsdJpy} />
      );
    case "cash":
      return <UpdateCashForm detail={detail} currentUsdJpy={currentUsdJpy} />;
    case "japanFund":
      return <UpdateJapanFundForm detail={detail} />;
    default:
      <p>aaaaa</p>;
  }
};

Component.displayName = "UpdateAssetForm";
export const UpdateAssetForm = React.memo(Component);
