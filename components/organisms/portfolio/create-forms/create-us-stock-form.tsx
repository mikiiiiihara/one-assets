import { PrimaryButton } from "@components/molecules/primary-button";
import useCreateUsStock from "@hooks/us-stock/useCreateUsStock";
import { Asset } from "@server/services/asset/asset";
import { useAssetsContext } from "contexts/assetsContext";
import React, { FC, useState } from "react";
import { SECTOR_LIST } from "./sector-list";

type Props = {
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ currentUsdJpy }) => {
  const { isCreating, createUsStock, error } = useCreateUsStock();
  const { setAssets } = useAssetsContext();
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [getPrice, setGetPrice] = useState(0);
  const [sector, setSector] = useState("");
  const [usdJpy, setUsdJpy] = useState(currentUsdJpy);
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    if (
      code === "" ||
      quantity === 0 ||
      getPrice === 0 ||
      sector === "" ||
      usdJpy === 0
    ) {
      alert("不正な入力値があります。");
      return;
    }
    //追加
    const createdUsStock = await createUsStock(
      code,
      getPrice,
      quantity,
      sector,
      usdJpy
    );
    // 資産情報のstateも更新
    if (createdUsStock) {
      const createdAsset: Asset = {
        code: createdUsStock.code,
        name: createdUsStock.code,
        currentPrice: createdUsStock.currentPrice,
        currentRate: createdUsStock.currentRate,
        dividends: createdUsStock.dividends,
        getPrice: createdUsStock.getPrice,
        getPriceTotal: createdUsStock.getPrice * createdUsStock.quantity,
        id: createdUsStock.id,
        priceGets: createdUsStock.priceGets,
        quantity: createdUsStock.quantity,
        sector: createdUsStock.sector,
        usdJpy: createdUsStock.usdjpy,
        group: "usStock",
      };
      setAssets((prev) => {
        return [...prev, createdAsset];
      });
    }
    alert(`${code}を追加しました！`);
  };
  return (
    <form onSubmit={onSumbit}>
      <div className="mb-4 mt-4">
        <p className="pb-1">
          銘柄コード：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="例:AAPL"
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
          取得為替：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={usdJpy}
            onChange={(e) => setUsdJpy(Number(e.target.value))}
            placeholder="例:150.2"
          />
        </p>
      </div>
      <PrimaryButton
        className="ml-1"
        content={!isCreating ? "追加" : "追加中..."}
        type="submit"
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

Component.displayName = "CreateUsStockForm";
export const CreateUsStockForm = React.memo(Component);
