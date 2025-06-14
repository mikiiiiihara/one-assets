import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import { useAssetsContext } from "contexts/assetsContext";
import useUpdateFixedIncomeAsset from "@hooks/fixed-income-asset/useUpdateFixedIncomeAsset";
import useDeleteFixedIncomeAsset from "@hooks/fixed-income-asset/useDeleteFixedIncomeAsset";
import { DangerButton } from "@components/molecules/danger-button";

type Props = {
  detail: Detail;
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ detail, currentUsdJpy }) => {
  const { isUpdating, updateFixedIncomeAsset, error } = useUpdateFixedIncomeAsset();
  const { isDeleting, deleteFixedIncomeAsset, error: deleteError } = useDeleteFixedIncomeAsset();
  const { setAssets } = useAssetsContext();
  const [getPriceTotal, setGetPriceTotal] = useState(detail.getPriceTotal || 0);
  const [dividendRate, setDividendRate] = useState(detail.dividendRate || 0);
  const [paymentMonth, setPaymentMonth] = useState<number[]>(detail.paymentMonth || []);

  const handlePaymentMonthChange = (month: number, checked: boolean) => {
    if (checked) {
      setPaymentMonth([...paymentMonth, month].sort((a, b) => a - b));
    } else {
      setPaymentMonth(paymentMonth.filter(m => m !== month));
    }
  };

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // usdjpyは現在の値を使用（更新しない）
    const updatedAsset = await updateFixedIncomeAsset(detail.id, getPriceTotal, dividendRate, detail.usdjpy || currentUsdJpy, paymentMonth);
    if (updatedAsset) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === updatedAsset.id) {
            return {
              ...asset,
              getPriceTotal: updatedAsset.getPriceTotal,
              dividendRate: updatedAsset.dividendRate,
              paymentMonth: updatedAsset.paymentMonth,
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
      const deletedAsset = await deleteFixedIncomeAsset(detail.id);

      if (deletedAsset) {
        setAssets((prev) => {
          return prev.filter((asset) => asset.id !== deletedAsset.id);
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
            総取得金額：
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={getPriceTotal}
              onChange={(e) => setGetPriceTotal(Number(e.target.value))}
              placeholder="例:1000000"
            />
          </p>
          <p className="pb-1">
            配当率（%）：
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              step="0.01"
              value={dividendRate}
              onChange={(e) => setDividendRate(Number(e.target.value))}
              placeholder="例:3.5"
            />
          </p>
          <p className="pb-1">配当支払月：</p>
          <div className="grid grid-cols-4 gap-2 ml-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <label key={month} className="flex items-center">
                <input
                  type="checkbox"
                  checked={paymentMonth.includes(month)}
                  onChange={(e) => handlePaymentMonthChange(month, e.target.checked)}
                  className="mr-1"
                />
                {month}月
              </label>
            ))}
          </div>
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

Component.displayName = "UpdateFixedIncomeAssetForm";
export const UpdateFixedIncomeAssetForm = React.memo(Component);