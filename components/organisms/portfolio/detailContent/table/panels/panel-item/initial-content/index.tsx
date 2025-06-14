import React, { FC } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { DisplayType } from "..";

type Props = {
  detail: Detail;
  rate: number;
  displayType: DisplayType | undefined;
};

const Component: FC<Props> = ({ detail, rate, displayType }) => {
  //保有資産：損益
  const balance = detail.balance;
  return (
    <>
      <div>
        <p></p>
        {detail.sector !== "japanFund" &&
        detail.sector !== "crypto" &&
        detail.sector !== "fixedIncomeAsset" ? (
          <p className={rate > 0 ? "text-plus" : "text-minus"}>
            {rate}
            {displayType == "balance" ? "" : "%"}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-4 mt-4">
        <p className="pb-1">セクター：{detail.sector}</p>
        {detail.sector !== "japanFund" && detail.sector !== "crypto" ? (
          <p className="pb-1">保有株数：{detail.quantity}</p>
        ) : (
          <></>
        )}
        {detail.getPrice ? (
          <p className="pb-1">
            取得価格：¥
            {(Math.round(detail.getPrice * 10) / 10).toLocaleString()}
          </p>
        ) : (
          <></>
        )}
        {detail.usdJpy !== 1 ? (
          <p className="pb-1">
            取得為替：¥
            {detail.usdJpy.toLocaleString()}
          </p>
        ) : (
          <></>
        )}
        <p className="pb-1">
          時価総額：¥
          {detail.sumOfPrice.toLocaleString()}
        </p>
        <p className="pb-1">
          損益額：
          <span className={balance > 0 ? "text-plus" : balance < 0 ? "text-minus" : ""}>
            {balance > 0 ? "+" : ""}¥{balance.toLocaleString()}({detail.balanceRate > 0 ? "+" : ""}{Math.round(detail.balanceRate * 100) / 100}%)
          </span>
        </p>
        {detail.sector !== "japanFund" && detail.sector !== "crypto" ? (
          <>
            <p className="pb-1">
              年配当総額：¥
              {detail.sumOfDividend.toLocaleString()}
            </p>
            <p className="pb-1">
              配当利回り：{Math.round(detail.dividendRate * 100) / 100}%
            </p>
          </>
        ) : (
          <> </>
        )}
      </div>
    </>
  );
};

Component.displayName = "InitialContent";
export const InitialContent = React.memo(Component);
