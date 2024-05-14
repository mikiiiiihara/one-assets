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
      <div
        className="w-[90%] m-auto border p-4 rounded drop-shadow border-neutral-600"
        onClick={changeModal}
      >
        <h3>{data.code}</h3>
        <p>¥{(Math.round(data.sumOfPrice * 10) / 10).toLocaleString()}</p>
        <p className={rate > 0 ? "text-plus" : "text-minus"}>
          {data.sector !== "japanFund" &&
          data.sector !== "crypto" &&
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
      <div className="">
        {modalState ? (
          <div
            className="w-[90%] m-auto border p-4 rounded drop-shadow border-neutral-600"
            onClick={changeModal}
          >
            <div className="">
              <div className="">
                <p className="">{data.code}</p>
                {data.sector !== "fixedIncomeAsset" ? (
                  <div>
                    <p className="">
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
              <p className="">セクター：{data.sector}</p>
              {data.sector !== "japanFund" && data.sector !== "crypto" ? (
                <p className="">保有株数：{data.quantity}</p>
              ) : (
                <></>
              )}
              {data.getPrice ? (
                <p className="">
                  取得価格：¥
                  {(Math.round(data.getPrice * 10) / 10).toLocaleString()}
                </p>
              ) : (
                <></>
              )}
              {data.usdJpy !== 1 ? (
                <p className="">
                  取得為替：¥
                  {data.usdJpy.toLocaleString()}
                </p>
              ) : (
                <></>
              )}
              <p className="">
                時価総額：¥
                {data.sumOfPrice.toLocaleString()}
              </p>
              <p className="">
                損益額：
                <span className={balance > 0 ? "text-plus" : "text-minus"}>
                  ¥{balance.toLocaleString()}（{data.balanceRate}%）
                </span>
              </p>
              {data.sector !== "japanFund" && data.sector !== "crypto" ? (
                <>
                  <p className="">
                    年配当総額：¥
                    {data.sumOfDividend.toLocaleString()}
                  </p>
                  <p className="">
                    配当利回り：{Math.round(data.dividendRate * 100) / 100}%
                  </p>
                </>
              ) : (
                <> </>
              )}
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
