import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import { useAssetsContext } from "contexts/assetsContext";
import useUpdateJapanFund from "@hooks/japan-fund/useUpdateJapanFund";

type Props = {
  detail: Detail;
};

const Component: FC<Props> = ({ detail }) => {
  const { isUpdating, updateJapanFund, error } = useUpdateJapanFund();
  const { setAssets } = useAssetsContext();
  const [getPriceTotal, setGetPriceTotal] = useState(detail.sumOfGetPrice);
  const [getPrice, setGetPrice] = useState(detail.getPrice);

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //更新
    const updatedJapanFund = await updateJapanFund(
      detail.id,
      detail.name,
      detail.code,
      getPriceTotal,
      getPrice
    );

    // 資産情報のstateも更新
    if (updatedJapanFund) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === updatedJapanFund.id) {
            return {
              ...asset,
              getPriceTotal: updatedJapanFund.getPriceTotal,
              getPrice: updatedJapanFund.getPrice,
            };
          } else {
            return asset;
          }
        });
      });
    }
    alert("更新しました！");
  };
  return (
    <form onSubmit={onSumbit}>
      <div className="mb-4 mt-4">
        <p className="pb-1">銘柄名：{detail.name}</p>
        <p className="pb-1">
          取得総額：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={getPriceTotal}
            onChange={(e) => setGetPriceTotal(Number(e.target.value))}
            placeholder="例:50000"
          />
        </p>
        <p className="pb-1">
          取得価格：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={getPrice}
            onChange={(e) => setGetPrice(Number(e.target.value))}
            placeholder="例:12000"
          />
        </p>
      </div>
      <PrimaryButton
        className="ml-1"
        content={!isUpdating ? "更新" : "更新中..."}
        type="submit"
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

Component.displayName = "UpdateJapanFundForm";
export const UpdateJapanFundForm = React.memo(Component);
