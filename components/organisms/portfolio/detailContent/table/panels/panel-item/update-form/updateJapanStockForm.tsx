import React, { FC, useState } from "react";
import { Detail } from "@components/organisms/portfolio/types";
import { PrimaryButton } from "@components/molecules/primary-button";
import { useAssetsContext } from "contexts/assetsContext";
import { DangerButton } from "@components/molecules/danger-button";
import { CashModel } from "@server/repositories/cash/cash.model";
import { DeleteUsStockInput } from "@server/repositories/stock/us/input";
import useDeleteJapanStock from "@hooks/japan-stock/useDeleteJapanStock";
import useUpdateJapanStock from "@hooks/japan-stock/useUpdateJapanStock";
import { buildDividendOfJapanStock } from "@server/services/asset";

type Props = {
  detail: Detail;
  cashes: CashModel[];
};

const Component: FC<Props> = ({ detail, cashes }) => {
  const { isUpdating, updateJapanStock, error } = useUpdateJapanStock();
  const {
    isDeleting,
    deleteJapanStock,
    error: deleteError,
  } = useDeleteJapanStock();
  const { setAssets } = useAssetsContext();
  const [name, setName] = useState(detail.name);
  const [quantity, setQuantity] = useState(detail.quantity);
  const [getPrice, setGetPrice] = useState(
    Math.round(detail.getPrice * 100) / 100
  );
  const taxRate = detail.isNoTax ? 1 : 0.8;
  const currentDividends = detail.dividend.reduce(
    (acc, cur) => acc + cur.price / taxRate,
    0
  );
  const [dividends, setDividends] = useState(currentDividends);
  const [cashId, setCashId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedForDelete, setIsCheckedForDelete] = useState(false);
  const [cashIdForDelete, setCashIdForDelete] = useState("");

  // 現金情報は円建てのみ扱う
  const cashesJpy = cashes.filter((cash) => cash.sector === "JPY");

  // 変更分の計算処理
  const currentGetPrice = Math.round(detail.getPrice * 100) / 100;
  const isChanged =
    quantity != detail.quantity ||
    getPrice != currentGetPrice ||
    name != detail.name ||
    currentDividends != dividends;
  // 変更差分
  const changedPrice =
    Math.round(
      (getPrice * quantity - currentGetPrice * detail.quantity) * 100
    ) / 100;
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
    const updatedJapanStock = await updateJapanStock({
      id: detail.id,
      name,
      quantity,
      getPrice,
      dividends,
      cashId: isChecked ? cashId : undefined,
      changedPrice: isChecked ? changedPrice : undefined,
    });

    // 資産情報のstateも更新
    if (updatedJapanStock) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === updatedJapanStock.id) {
            return {
              ...asset,
              name: updatedJapanStock.name,
              quantity: updatedJapanStock.quantity,
              getPrice: updatedJapanStock.getPrice,
              dividends: buildDividendOfJapanStock(updatedJapanStock.dividends),
              usdJpy: 1,
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
    const soldPrice = Math.round(detail.price * detail.quantity * 100) / 100;
    if (confirm("本当に全て売却しますか？")) {
      const input: DeleteUsStockInput = {
        id: detail.id,
        cashId: isCheckedForDelete ? cashIdForDelete : undefined,
        changedPrice: isCheckedForDelete ? soldPrice : undefined,
      };
      const deletedUsStock = await deleteJapanStock(input);

      // 資産情報のstateも更新
      if (deletedUsStock) {
        setAssets((prev) => {
          return prev.filter((asset) => asset.id !== deletedUsStock.id);
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
          <p className="pb-1">
            銘柄名：
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例:三菱商事"
            />
          </p>
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
            取得価格：¥
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={getPrice}
              onChange={(e) => setGetPrice(Number(e.target.value))}
              placeholder="例:50"
            />
          </p>
          <p className="pb-1">
            1年当たり配当額：¥
            <input
              className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
              type="number"
              value={dividends}
              onChange={(e) => setDividends(Number(e.target.value))}
              placeholder="例:120"
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
          disabled={!isChanged || (isChecked && !isEnoughCash)}
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

Component.displayName = "UpdateJapanStockForm";
export const UpdateJapanStockForm = React.memo(Component);
