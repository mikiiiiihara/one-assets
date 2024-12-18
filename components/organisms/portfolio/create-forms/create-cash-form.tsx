import { PrimaryButton } from "@components/molecules/primary-button";
import useCreateCash from "@hooks/cashes/useCreateCash";
import { Asset } from "@server/services/asset/asset";
import { useAssetsContext } from "contexts/assetsContext";
import React, { useState } from "react";

const Component = () => {
  const { isCreating, createCash, error } = useCreateCash();
  const { setAssets } = useAssetsContext();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [sector, setSector] = useState("");
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    if (name === "" || price === 0 || sector === "") {
      alert("不正な入力値があります。");
      return;
    }
    //追加
    const createdCash = await createCash(name, price, sector);
    // 資産情報のstateも更新
    if (createdCash) {
      const createdAsset: Asset = {
        code: createdCash.name,
        name: createdCash.name,
        currentPrice: 0,
        currentRate: 0,
        dividends: [],
        getPrice: 0,
        getPriceTotal: createdCash.price,
        id: createdCash.id,
        priceGets: 0,
        quantity: 1,
        sector: createdCash.sector,
        usdJpy: 1,
        isNoTax: false,
        group: "cash",
      };
      setAssets((prev) => {
        return [...prev, createdAsset];
      });
    }
    alert(`${name}を追加しました！`);
  };
  return (
    <form onSubmit={onSumbit}>
      <div className="mb-4 mt-4">
        <p className="pb-1">
          銘柄名：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例:楽天銀行"
          />
        </p>
        <p className="pb-1">
          総額：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="例:100,000"
          />
        </p>
        <p className="pb-1">
          セクター：
          <select
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
          </select>
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

Component.displayName = "CreateCashForm";
export const CreateCashForm = React.memo(Component);
