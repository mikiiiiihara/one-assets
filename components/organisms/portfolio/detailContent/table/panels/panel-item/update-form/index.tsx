import React, { FC } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { UpdateUsStockForm } from "./updateUsStockForm";
import { UpdateCashForm } from "./updateCashForm";
import { UpdateJapanFundForm } from "./updateJapanFundForm";
import useCashes from "@hooks/cashes/useCashes";
import { Loading } from "@components/atoms/loading";
import { UpdateJapanStockForm } from "./updateJapanStockForm";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ detail, currentUsdJpy }) => {
  // 現在の現金情報を取得
  const { cashes, isLoading, error } = useCashes();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  switch (detail.group) {
    case "usStock":
      return (
        <UpdateUsStockForm
          detail={detail}
          currentUsdJpy={currentUsdJpy}
          cashes={cashes}
        />
      );
    case "japanStock":
      return <UpdateJapanStockForm detail={detail} cashes={cashes} />;
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
