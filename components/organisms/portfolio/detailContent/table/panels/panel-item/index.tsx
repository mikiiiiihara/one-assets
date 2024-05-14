import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";

// 表示タイプ
export const DISPLAY_TYPE = {
  balance: "balance", // // 金額単位
  balanceRate: "balanceRate", // 率単位
} as const;

export type DisplayType = (typeof DISPLAY_TYPE)[keyof typeof DISPLAY_TYPE];

type Props = {
  data: Detail;
  currency: string;
  displayType?: DisplayType;
};

const AssetPanelItemComponent: FC<Props> = ({ data, displayType }) => {
  // モーダル表示切り替え用
  const [modalState, setModalState] = useState(false);
  const changeModal = () => {
    setModalState(!modalState);
  };
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

  //保有資産：損益
  const balance = data.balance;
  return (
    <div className="">
      <div className="w-[90%] z-[1000] text-left mt-4 mb-4 ml-auto mr-auto border p-4 rounded drop-shadow border-neutral-600 flex justify-between items-center">
        <div>
          <h3 className="text-lg">{data.name}</h3>
          <p className="text-xl">
            ¥{(Math.round(data.sumOfPrice * 10) / 10).toLocaleString()}
          </p>
          <p className={rate > 0 ? "text-plus" : "text-minus"}>
            {data.sector !== "japanFund" &&
            data.sector !== "crypto" &&
            data.sector !== "JPY" &&
            data.sector !== "USD" &&
            data.sector !== "fixedIncomeAsset" ? (
              <>
                {rate}
                {displayType == "balance" ? "" : "%"}
              </>
            ) : (
              <></>
            )}
          </p>
        </div>
        <p onClick={changeModal}>詳細</p>
      </div>
      <div className="">
        {modalState ? (
          <div className="fixed flex inset-0 w-full h-full bg-black bg-opacity-50 z-[999] m-auto text-left	border p-8 rounded border-neutral-600">
            <div className="h-auto w-[90%] m-auto p-8 rounded bg-[#343a40]">
              <div className="justify-between items-center">
                <p className="text-2xl">{data.name}</p>
                {data.sector == "japanStock" ? (
                  <p className="text-lg">{data.code}</p>
                ) : (
                  <></>
                )}
                {data.sector !== "fixedIncomeAsset" ? (
                  <div>
                    <p className="text-xl text-right">
                      ¥{(Math.round(data.price * 10) / 10).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className={`${styles.baseInfo} mb-3 ${styles.baseInfoRate}`}> */}
              <div>
                <p></p>
                {data.sector !== "japanFund" &&
                data.sector !== "crypto" &&
                data.sector !== "fixedIncomeAsset" ? (
                  <p className={rate > 0 ? "text-plus" : "text-minus"}>
                    {rate}
                    {displayType == "balance" ? "" : "%"}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-4 mt-4">
                <p className="pb-1">セクター：{data.sector}</p>
                {data.sector !== "japanFund" && data.sector !== "crypto" ? (
                  <p className="pb-1">保有株数：{data.quantity}</p>
                ) : (
                  <></>
                )}
                {data.getPrice ? (
                  <p className="pb-1">
                    取得価格：¥
                    {(Math.round(data.getPrice * 10) / 10).toLocaleString()}
                  </p>
                ) : (
                  <></>
                )}
                {data.usdJpy !== 1 ? (
                  <p className="pb-1">
                    取得為替：¥
                    {data.usdJpy.toLocaleString()}
                  </p>
                ) : (
                  <></>
                )}
                <p className="pb-1">
                  時価総額：¥
                  {data.sumOfPrice.toLocaleString()}
                </p>
                <p className="pb-1">
                  損益額：
                  <span className={balance > 0 ? "text-plus" : "text-minus"}>
                    ¥{balance.toLocaleString()}（{data.balanceRate}%）
                  </span>
                </p>
                {data.sector !== "japanFund" && data.sector !== "crypto" ? (
                  <>
                    <p className="pb-1">
                      年配当総額：¥
                      {data.sumOfDividend.toLocaleString()}
                    </p>
                    <p className="pb-1">
                      配当利回り：{Math.round(data.dividendRate * 100) / 100}%
                    </p>
                  </>
                ) : (
                  <> </>
                )}
              </div>
              <p className="text-right" onClick={changeModal}>
                閉じる
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

AssetPanelItemComponent.displayName = "AssetPanelItem";
export const AssetPanelItem = React.memo(AssetPanelItemComponent);
