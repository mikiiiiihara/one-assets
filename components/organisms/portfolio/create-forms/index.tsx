import React, { FC, useState } from "react";
import { CreateUsStockForm } from "./create-us-stock-form";
import { PrimaryButton } from "@components/molecules/primary-button";
import { CreateFixedIncomeAssetForm } from "./create-fixed-income-asset-form";
import { TextTitle1 } from "@components/atoms/text/textTitle1";
import { Center } from "@components/atoms/center";

type Props = {
  currentUsdJpy: number;
};
const DISPLAY_MODE = {
  usStock: "usStock",
  fixedIncomeAsset: "fixedIncomeAsset",
};

const Component: FC<Props> = ({ currentUsdJpy }) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.usStock);

  const renderForm = () => {
    switch (displayMode) {
      case DISPLAY_MODE.usStock:
        return <CreateUsStockForm currentUsdJpy={currentUsdJpy} />;
      case DISPLAY_MODE.fixedIncomeAsset:
        return <CreateFixedIncomeAssetForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Center>
        <TextTitle1>銘柄を追加</TextTitle1>
      </Center>
      <div className="m-5 flex justify-center">
        <PrimaryButton
          content="米国株"
          notSelected={displayMode !== DISPLAY_MODE.usStock}
          onClick={() => setDisplayMode(DISPLAY_MODE.usStock)}
        />
        <PrimaryButton
          content="固定利回り資産"
          notSelected={displayMode !== DISPLAY_MODE.fixedIncomeAsset}
          onClick={() => setDisplayMode(DISPLAY_MODE.fixedIncomeAsset)}
        />
      </div>
      {/* 選択値によってフォームを切り替える */}
      {renderForm()}
    </>
  );
};

Component.displayName = "CreateForms";
export const CreateForms = React.memo(Component);
