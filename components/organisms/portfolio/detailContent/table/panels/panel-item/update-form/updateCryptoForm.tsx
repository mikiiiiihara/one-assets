import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import { useAssetsContext } from "contexts/assetsContext";
import useUpdateCrypto from "@hooks/crypto/useUpdateCrypto";
import useDeleteCrypto from "@hooks/crypto/useDeleteCrypto";
import { DangerButton } from "@components/molecules/danger-button";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ detail, currentUsdJpy }) => {
  const { isUpdating, updateCrypto, error } = useUpdateCrypto();
  const { isDeleting, deleteCrypto, error: deleteError } = useDeleteCrypto();
  const { setAssets } = useAssetsContext();
  const [getPrice, setGetPrice] = useState(detail.getPrice || 0);
  const [quantity, setQuantity] = useState(detail.quantity || 0);

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCrypto = await updateCrypto(detail.id, getPrice, quantity);
    if (updatedCrypto) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === updatedCrypto.id) {
            return {
              ...asset,
              getPrice: updatedCrypto.getPrice,
              quantity: updatedCrypto.quantity,
              getPriceTotal: updatedCrypto.getPrice * updatedCrypto.quantity,
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
      const deletedCrypto = await deleteCrypto(detail.id);

      if (deletedCrypto) {
        setAssets((prev) => {
          return prev.filter((asset) => asset.id !== deletedCrypto.id);
        });
      }
      alert("削除しました！");
    }
  };

  return (
    <>
      <form onSubmit={onSumbit}>
        <div className="mb-4 mt-4">
          <p className="pb-1">
            取得価格：
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              step="0.01"
              value={getPrice}
              onChange={(e) => setGetPrice(Number(e.target.value))}
              placeholder="例:50000"
            />
          </p>
          <p className="pb-1">
            保有数量：
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              step="0.00000001"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="例:0.5"
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
      <DangerButton
        className="ml-1 mt-2"
        content={!isDeleting ? "削除" : "削除中..."}
        onClick={onDelete}
      />
      {deleteError && <div className="text-red-500 mt-2">{deleteError}</div>}
    </>
  );
};

Component.displayName = "UpdateCryptoForm";
export const UpdateCryptoForm = React.memo(Component);