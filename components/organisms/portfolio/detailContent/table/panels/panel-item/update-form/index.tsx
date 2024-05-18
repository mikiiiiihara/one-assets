import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import useUpdateUsStock from "@hooks/us-stock/useUpdateUsStock";
import { useAssetsContext } from "contexts/assetsContext";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ detail, currentUsdJpy }) => {
  const { isUpdating, updateUsStock, error } = useUpdateUsStock();
  const { setAssets } = useAssetsContext();
  const [quantity, setQuantity] = useState(detail.quantity);
  const [getPrice, setGetPrice] = useState(
    Math.round((detail.getPrice / currentUsdJpy) * 100) / 100
  );
  const [usdJpy, setUsdJpy] = useState(detail.usdJpy);

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: 米国株のみ実装。他の資産にも対応する
    e.preventDefault();
    //更新
    const updatedUsStock = await updateUsStock(
      detail.id,
      quantity,
      getPrice,
      usdJpy
    );

    // 資産情報のstateも更新
    if (updatedUsStock) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === updatedUsStock.id) {
            return {
              ...asset,
              quantity: updatedUsStock.quantity,
              getPrice: updatedUsStock.getPrice,
              usdJpy: updatedUsStock.usdjpy,
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
        {detail.sector !== "japanFund" && detail.sector !== "crypto" ? (
          <p className="pb-1">
            保有株数：{" "}
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="例:10"
            />
          </p>
        ) : (
          <></>
        )}
        {detail.getPrice ? (
          <p className="pb-1">
            取得価格：$
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={getPrice}
              onChange={(e) => setGetPrice(Number(e.target.value))}
              placeholder="例:50"
            />
          </p>
        ) : (
          <></>
        )}
        {detail.usdJpy !== 1 ? (
          <p className="pb-1">
            取得為替：¥
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={usdJpy}
              onChange={(e) => setUsdJpy(Number(e.target.value))}
              placeholder="例:150.2"
            />
          </p>
        ) : (
          <></>
        )}
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

Component.displayName = "UpdateAssetForm";
export const UpdateAssetForm = React.memo(Component);
