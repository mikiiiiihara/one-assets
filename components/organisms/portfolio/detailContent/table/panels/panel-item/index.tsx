import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { InitialContent } from "./initial-content";
import { Button } from "@components/atoms/button";
import { UpdateAssetForm } from "./update-form";
import { Modal } from "@components/atoms/modal";

// 表示タイプ
export const DISPLAY_TYPE = {
  balance: "balance", // // 金額単位
  balanceRate: "balanceRate", // 率単位
} as const;

export type DisplayType = (typeof DISPLAY_TYPE)[keyof typeof DISPLAY_TYPE];

type Props = {
  data: Detail;
  currentUsdJpy: number;
  displayType?: DisplayType;
};

const AssetPanelItemComponent: FC<Props> = ({
  data,
  displayType,
  currentUsdJpy,
}) => {
  // モーダル表示切り替え用
  const [modalState, setModalState] = useState(false);
  const changeModal = () => {
    setModalState(!modalState);
  };
  // モーダル表示切り替え用
  const [formState, setFormState] = useState(false);
  // const changeForm = () => {
  //   setModalState(!modalState);
  // };
  //表示する項目
  let rate = Math.round(data.priceRate * 100) / 100;
  switch (displayType) {
    case "balance":
      rate = Math.round(data.balance * 100) / 100;
      break;
    case "balanceRate":
      rate = Math.round(data.balanceRate * 100) / 100;
      break;
  }
  const price =
    data.group == "usStock" ? data.price / currentUsdJpy : data.price;
  const displayPrice = Math.round(price * 10) / 10;

  return (
    <div className="">
      <div className="w-[90%] z-[1000] text-left mt-4 mb-4 ml-auto mr-auto border p-4 rounded drop-shadow border-neutral-600 flex justify-between items-center">
        <div className="w-[80%]">
          <h3 className="text-lg">{data.name}</h3>
          <p className="text-xl">
            ¥{(Math.round(data.sumOfPrice * 10) / 10).toLocaleString()}
          </p>
          {data.group == "japanFund" ||
          data.group == "crypto" ||
          data.group == "japanStock" ||
          data.group == "usStock" ? (
            <div>
              <p className={data.priceRate > 0 ? "text-plus" : data.priceRate < 0 ? "text-minus" : ""}>
                株価変化率: {data.priceRate > 0 ? "+" : ""}{Math.round(data.priceRate * 100) / 100}%
              </p>
              <p className={data.balance > 0 ? "text-plus" : data.balance < 0 ? "text-minus" : ""}>
                損益: {data.balance > 0 ? "+" : ""}
                ¥{data.balance.toLocaleString()}({Math.round(data.balanceRate * 100) / 100}%)
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <p onClick={changeModal}>詳細</p>
      </div>
      <div className="">
        {modalState ? (
          <Modal>
            <div className="justify-between items-center">
              <p className="text-2xl">{data.name}</p>
              {data.isNoTax ? <p>NISA</p> : <></>}
              {data.sector !== "fixedIncomeAsset" ? (
                <div>
                  <p className="text-xl text-right">
                    {data.group == "usStock" ? "$" : "¥"}
                    {displayPrice.toLocaleString()}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                className="text-white bg-primary-700"
                onClick={() => setFormState(!formState)}
              >
                {formState ? "終了" : "編集"}
              </Button>
            </div>
            {!formState ? (
              <InitialContent
                detail={data}
                rate={rate}
                displayType={displayType}
              />
            ) : (
              <UpdateAssetForm detail={data} currentUsdJpy={currentUsdJpy} />
            )}
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
    </div>
  );
};

AssetPanelItemComponent.displayName = "AssetPanelItem";
export const AssetPanelItem = React.memo(AssetPanelItemComponent);
