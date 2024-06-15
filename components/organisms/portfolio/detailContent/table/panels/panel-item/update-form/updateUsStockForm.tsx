import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import useUpdateUsStock from "@hooks/us-stock/useUpdateUsStock";
import { useAssetsContext } from "contexts/assetsContext";
import useDeleteUsStock from "@hooks/us-stock/useDeleteUsStock";
import { DangerButton } from "@components/molecules/danger-button";
import { CashModel } from "@server/repositories/cash/cash.model";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
  cashes: CashModel[];
};

const Component: FC<Props> = ({ detail, currentUsdJpy, cashes }) => {
  const { isUpdating, updateUsStock, error } = useUpdateUsStock();
  const { isDeleting, deleteUsStock, error: deleteError } = useDeleteUsStock();
  const { setAssets } = useAssetsContext();
  const [quantity, setQuantity] = useState(detail.quantity);
  const [getPrice, setGetPrice] = useState(
    Math.round((detail.getPrice / currentUsdJpy) * 100) / 100
  );
  const [usdJpy, setUsdJpy] = useState(detail.usdJpy);
  const [cashId, setCashId] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const onDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      const deletedUsStock = await deleteUsStock(detail.id);

      // 資産情報のstateも更新
      if (deletedUsStock) {
        setAssets((prev) => {
          return prev.filter((asset) => asset.id !== deletedUsStock.id);
        });
      }
      alert("削除しました！");
    }
  };

  // 変更分の計算処理
  const currentGetPriceUSD =
    Math.round((detail.getPrice / currentUsdJpy) * 100) / 100;
  const isChanged =
    quantity != detail.quantity || getPrice != currentGetPriceUSD;
  // 変更差分
  const changedPriceUSD =
    Math.round(
      (getPrice * quantity - currentGetPriceUSD * detail.quantity) * 100
    ) / 100;
  const changedPriceJPY =
    Math.round(
      (getPrice * quantity * usdJpy -
        currentGetPriceUSD * detail.quantity * detail.usdJpy) *
        100
    ) / 100;
  // 現金情報に反映する場合、口座の金額が足りているか？
  const cash = cashes.find((cash) => cash.id === cashId);
  // ドル建てか円建てかで判定方法を変える
  const comparedCashPrice =
    cash?.sector === "USD" ? changedPriceUSD : changedPriceJPY;
  const isEnoughCash = cash ? cash.price >= comparedCashPrice : true;
  return (
    <>
      <form onSubmit={onSumbit}>
        <div className="mb-4 mt-4">
          <p className="pb-1">
            保有株数：
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="例:10"
            />
          </p>
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
          <p className="pb-1">
            追加発生費用：
            {isChanged
              ? `$${changedPriceUSD.toLocaleString()}(¥${changedPriceJPY.toLocaleString()})`
              : "$0"}
          </p>
          {isChanged ? (
            <div>
              <p className="pb-1">
                変更分を現金情報に反映：
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </p>
              {isChecked && (
                <p>
                  <select
                    className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
                    value={cashId}
                    onChange={(e) => setCashId(e.target.value)}
                  >
                    <option value="" disabled>
                      選択してください
                    </option>
                    {cashes.map((cash) => (
                      <option key={cash.id} value={cash.id}>
                        {cash.name}:{cash.sector == "JPY" ? "¥" : "$"}
                        {cash.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  {isChecked && !isEnoughCash && (
                    <span className="text-red-500">金額が足りません</span>
                  )}
                </p>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <PrimaryButton
          className="ml-1"
          content={!isUpdating ? "更新" : "更新中..."}
          disabled={!isChanged || (isChecked && !isEnoughCash)}
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

Component.displayName = "UpdateUsStockForm";
export const UpdateUsStockForm = React.memo(Component);
