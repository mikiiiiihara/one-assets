import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import { useAssetsContext } from "contexts/assetsContext";
import useUpdateCash from "@hooks/cashes/useUpdateCash";
import useDeleteCash from "@hooks/cashes/useDeleteCash";
import { DangerButton } from "@components/molecules/danger-button";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ detail, currentUsdJpy }) => {
  const { isUpdating, updateCash, error } = useUpdateCash();
  const { isDeleting, deleteCash, error: deleteError } = useDeleteCash();
  const { setAssets } = useAssetsContext();
  const [price, setPrice] = useState(
    detail.sector === "USD"
      ? detail.sumOfPrice / currentUsdJpy
      : detail.sumOfPrice
  );

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //更新
    const updatedCash = await updateCash(detail.id, price);
    // 資産情報のstateも更新
    if (updatedCash) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === updatedCash.id) {
            return {
              ...asset,
              getPriceTotal: updatedCash.price,
            };
          } else {
            return asset;
          }
        });
      });
    }
    alert("更新しました！");
  };
  const onDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      const deletedCash = await deleteCash(detail.id);

      // 資産情報のstateも更新
      if (deletedCash) {
        setAssets((prev) => {
          return prev.filter((asset) => asset.id !== deletedCash.id);
        });
      }
      alert("削除しました！");
    }
  };
  return (
    <>
      <form onSubmit={onSumbit}>
        <div className="mb-4 mt-4">
          {detail.sector !== "japanFund" && detail.sector !== "crypto" ? (
            <p className="pb-1">
              総額：
              <input
                className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="例:10,000"
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
      <DangerButton
        className="ml-1 mt-2"
        content={!isDeleting ? "削除" : "削除中..."}
        onClick={onDelete}
      />
      {deleteError && <div className="text-red-500 mt-2">{deleteError}</div>}
    </>
  );
};

Component.displayName = "UpdateCashForm";
export const UpdateCashForm = React.memo(Component);
