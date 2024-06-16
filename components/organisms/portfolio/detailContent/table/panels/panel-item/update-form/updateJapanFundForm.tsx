import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import { useAssetsContext } from "contexts/assetsContext";
import useUpdateJapanFund from "@hooks/japan-fund/useUpdateJapanFund";
import { CashModel } from "@server/repositories/cash/cash.model";
import { DangerButton } from "@components/molecules/danger-button";
import useDeleteJapanFund from "@hooks/japan-fund/useDeleteJapanFund";
import { DeleteJapanFundInput } from "@server/repositories/japan-fund/input";

type Props = {
  detail: Detail;
  cashes: CashModel[];
};

const Component: FC<Props> = ({ detail, cashes }) => {
  const { isUpdating, updateJapanFund, error } = useUpdateJapanFund();
  const {
    isDeleting,
    deleteJapanFund,
    error: deleteError,
  } = useDeleteJapanFund();
  const { setAssets } = useAssetsContext();
  const [getPriceTotal, setGetPriceTotal] = useState(detail.sumOfGetPrice);
  const [getPrice, setGetPrice] = useState(detail.getPrice);
  const [cashId, setCashId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedForDelete, setIsCheckedForDelete] = useState(false);
  const [cashIdForDelete, setCashIdForDelete] = useState("");
  // 現金情報は円建てのみ扱う
  const cashesJpy = cashes.filter((cash) => cash.sector === "JPY");

  // 変更分の計算処理
  const isChanged = getPriceTotal != detail.sumOfGetPrice;
  // 変更差分
  const changedPrice =
    Math.round((getPriceTotal - detail.sumOfGetPrice) * 100) / 100;
  // 現金情報に反映する場合、口座の金額が足りているか？
  const cash = cashesJpy.find((cash) => cash.id === cashId);
  const isEnoughCash = cash ? cash.price >= changedPrice : true;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxChangeForDelete = () => {
    setIsCheckedForDelete(!isCheckedForDelete);
  };

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //更新
    const updatedJapanFund = await updateJapanFund({
      id: detail.id,
      name: detail.name,
      code: detail.code,
      getPriceTotal,
      getPrice,
      cashId: isChecked ? cashId : undefined,
      changedPrice: isChecked ? changedPrice : undefined,
    });

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
    // cashも更新
    if (isChecked) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === cashId) {
            return {
              ...asset,
              getPriceTotal: asset.getPriceTotal - changedPrice,
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
    const soldPrice = Math.round(detail.sumOfPrice * 100) / 100;
    if (confirm("本当に全て売却しますか？")) {
      const input: DeleteJapanFundInput = {
        id: detail.id,
        cashId: isCheckedForDelete ? cashIdForDelete : undefined,
        changedPrice: isCheckedForDelete ? soldPrice : undefined,
      };
      const deletedJapanFund = await deleteJapanFund(input);

      // 資産情報のstateも更新
      if (deletedJapanFund) {
        setAssets((prev) => {
          return prev.filter((asset) => asset.id !== deletedJapanFund.id);
        });
      }
      // cashも更新
      if (isCheckedForDelete) {
        setAssets((prev) => {
          return prev.map((asset) => {
            if (asset.id === cashIdForDelete) {
              return {
                ...asset,
                getPriceTotal: asset.getPriceTotal + soldPrice,
              };
            } else {
              return asset;
            }
          });
        });
      }
      alert("削除しました！");
    }
  };
  return (
    <>
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
          <p className="pb-1">
            追加発生費用：
            {isChanged ? `¥${changedPrice.toLocaleString()}` : "¥0"}
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
                    {cashesJpy.map((cash) => (
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
          type="submit"
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
      <div className="mt-8">
        <DangerButton
          className="ml-1 mt-2"
          content={!isDeleting ? "全て売却" : "売却中..."}
          onClick={onDelete}
        />
        <p className="pb-1">
          全売却分を現金情報に反映：
          <input
            type="checkbox"
            checked={isCheckedForDelete}
            onChange={handleCheckboxChangeForDelete}
          />
        </p>
        {isCheckedForDelete && (
          <p>
            <select
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              value={cashIdForDelete}
              onChange={(e) => setCashIdForDelete(e.target.value)}
            >
              <option value="" disabled>
                選択してください
              </option>
              {cashesJpy.map((cash) => (
                <option key={cash.id} value={cash.id}>
                  {cash.name}:{cash.sector == "JPY" ? "¥" : "$"}
                  {cash.price.toLocaleString()}
                </option>
              ))}
            </select>
          </p>
        )}
      </div>
      {deleteError && <div className="text-red-500 mt-2">{deleteError}</div>}
    </>
  );
};

Component.displayName = "UpdateJapanFundForm";
export const UpdateJapanFundForm = React.memo(Component);
