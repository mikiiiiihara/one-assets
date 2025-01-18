import { PrimaryButton } from "@components/molecules/primary-button";
import useCreateCrypto from "@hooks/crypto/useCreateCrypto";
import { Asset } from "@server/services/asset/asset";
import { useAssetsContext } from "contexts/assetsContext";
import React, { useState } from "react";
import { CRYPTO_LIST } from "./crypto-list";

const Component = () => {
  const { isCreating, createCrypto, error } = useCreateCrypto();
  const { setAssets } = useAssetsContext();
  const [code, setCode] = useState("");
  const [getPrice, setGetPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    if (code === "" || getPrice === 0 || quantity === 0) {
      alert("不正な入力値があります。");
      return;
    }
    //追加
    const createdCrypto = await createCrypto(code, getPrice, quantity);
    // 資産情報のstateも更新
    if (createdCrypto) {
      const createdAsset: Asset = {
        code: createdCrypto.code,
        name: createdCrypto.code,
        currentPrice: createdCrypto.currentPrice,
        currentRate: 0,
        dividends: [],
        getPrice: createdCrypto.getPrice,
        getPriceTotal: createdCrypto.getPrice * createdCrypto.quantity,
        id: createdCrypto.id,
        priceGets: 0,
        quantity: createdCrypto.quantity,
        sector: "crypto",
        usdJpy: 1,
        isNoTax: false,
        group: "crypto",
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
          <select
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          >
            <option value="" disabled>
              選択してください
            </option>
            {CRYPTO_LIST.map((crypto) => (
              <option key={crypto.id} value={crypto.value}>
                {crypto.name}
              </option>
            ))}
          </select>
        </p>
        <p className="pb-1">
          取得価格：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={getPrice}
            onChange={(e) => setGetPrice(Number(e.target.value))}
            placeholder="例:100,000"
          />
        </p>
        <p className="pb-1">
          数量：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="例:100"
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

Component.displayName = "CreateCryptoForm";
export const CreateCryptoForm = React.memo(Component);
