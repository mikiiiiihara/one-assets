import { PrimaryButton } from "@components/molecules/primary-button";
import { Asset } from "@server/services/asset/asset";
import { useAssetsContext } from "contexts/assetsContext";
import React, { FC, useState } from "react";
import { SECTOR_LIST } from "./sector-list";
import { CashModel } from "@server/repositories/cash/cash.model";
import useJapanStockPrices from "@hooks/japan-stock-prices/useJapanStockPrices";
import useCreateJapanStock from "@hooks/japan-stock/useCreateJapanStock";
import { buildDividendOfJapanStock } from "@server/services/asset";

type Props = {
  cashes: CashModel[];
};

const Component: FC<Props> = ({ cashes }) => {
  const { isCreating, createJapanStock, error } = useCreateJapanStock();
  const { stockPrices } = useJapanStockPrices();
  const { setAssets } = useAssetsContext();
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [getPrice, setGetPrice] = useState(0);
  const [sector, setSector] = useState("");
  const [cashId, setCashId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const cashesJpy = cashes.filter((cash) => cash.sector === "JPY");
  // 現金情報に反映する場合、口座の金額が足りているか？
  const cash = cashesJpy.find((cash) => cash.id === cashId);
  const comparedCashPrice = getPrice * quantity;
  const isEnoughCash = cash ? cash.price >= comparedCashPrice : true;
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    if (code === "" || quantity === 0 || getPrice === 0 || sector === "") {
      alert("不正な入力値があります。");
      return;
    }
    //追加
    const createdJapanStock = await createJapanStock(
      code,
      getPrice,
      quantity,
      sector,
      isChecked ? cashId : undefined,
      isChecked ? comparedCashPrice : undefined
    );
    // 資産情報のstateも更新
    if (createdJapanStock) {
      const createdAsset: Asset = {
        code: createdJapanStock.code,
        name: createdJapanStock.name,
        currentPrice: createdJapanStock.currentPrice,
        currentRate: 0,
        dividends: buildDividendOfJapanStock(createdJapanStock.dividends),
        getPrice: createdJapanStock.getPrice,
        getPriceTotal: createdJapanStock.getPrice * createdJapanStock.quantity,
        id: createdJapanStock.id,
        priceGets: 0,
        quantity: createdJapanStock.quantity,
        sector: createdJapanStock.sector,
        usdJpy: 1,
        group: "japanStock",
      };
      setAssets((prev) => {
        return [...prev, createdAsset];
      });
    }
    // cashも更新
    if (isChecked) {
      setAssets((prev) => {
        return prev.map((asset) => {
          if (asset.id === cashId) {
            return {
              ...asset,
              getPriceTotal: asset.getPriceTotal - comparedCashPrice,
            };
          } else {
            return asset;
          }
        });
      });
    }
    alert(`${code}を追加しました！`);
  };
  return (
    <form onSubmit={onSumbit}>
      <div className="mb-4 mt-4">
        <p className="pb-1">
          銘柄：
          <select
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            value={code}
            onChange={(e) => {
              const code = e.target.value;
              setCode(code);
              // priceにも反映する
              const stockPrice = stockPrices.find(
                (stockPrice) => stockPrice.code === code
              );
              if (stockPrice) {
                setGetPrice(stockPrice.price);
              }
            }}
          >
            <option value="" disabled>
              選択してください
            </option>
            {stockPrices.map((stockPrice) => (
              <option key={stockPrice.id} value={stockPrice.code}>
                {stockPrice.name}
              </option>
            ))}
          </select>
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
          セクター：
          <select
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="" disabled>
              選択してください
            </option>
            {SECTOR_LIST.map((sector) => (
              <option key={sector.id} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </p>
        <p className="pb-1">
          見積価格：¥ {Math.round(getPrice * quantity).toLocaleString()}
        </p>
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
      </div>

      <PrimaryButton
        className="ml-1"
        content={!isCreating ? "追加" : "追加中..."}
        disabled={isChecked && !isEnoughCash}
        type="submit"
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

Component.displayName = "CreateJapanStockForm";
export const CreateJapanStockForm = React.memo(Component);
