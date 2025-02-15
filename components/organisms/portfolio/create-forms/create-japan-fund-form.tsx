import { PrimaryButton } from "@components/molecules/primary-button";
import { Asset } from "@server/services/asset/asset";
import { useAssetsContext } from "contexts/assetsContext";
import React, { useState } from "react";
import useCreateJapanFund from "@hooks/japan-fund/useCreateJapanFund";
import { JAPAN_FUND_LIST } from "./japan-fund-list";

const Component = () => {
  const { isCreating, createJapanFund, error } = useCreateJapanFund();
  const { setAssets } = useAssetsContext();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [getPrice, setGetPrice] = useState(0);
  const [getPriceTotal, setGetPriceTotal] = useState(0);
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    if (code === "" || getPrice === 0 || getPriceTotal === 0 || name === "") {
      alert("不正な入力値があります。");
      return;
    }
    //追加
    const createdJapanFund = await createJapanFund(
      code,
      name,
      getPrice,
      getPriceTotal
    );
    // 資産情報のstateも更新
    if (createdJapanFund) {
      const createdAsset: Asset = {
        code: createdJapanFund.code,
        name: createdJapanFund.name,
        currentPrice: createdJapanFund.currentPrice,
        currentRate: 0,
        dividends: [],
        getPrice: createdJapanFund.getPrice,
        getPriceTotal: createdJapanFund.getPriceTotal,
        id: createdJapanFund.id,
        priceGets: 0,
        quantity: 0,
        sector: "japanFund",
        usdJpy: 0,
        isNoTax: false,
        group: "japanFund",
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
          銘柄名：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例:ｅＭＡＸＩＳ Ｓｌｉｍ 米国株式（Ｓ＆Ｐ５００）"
          />
        </p>
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
            {JAPAN_FUND_LIST.map((fund) => (
              <option key={fund.id} value={fund.value}>
                {fund.name}
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
          取得価格合計：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={getPriceTotal}
            onChange={(e) => setGetPriceTotal(Number(e.target.value))}
            placeholder="例:100,000"
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

Component.displayName = "CreateJapanFundForm";
export const CreateJapanFundForm = React.memo(Component);
