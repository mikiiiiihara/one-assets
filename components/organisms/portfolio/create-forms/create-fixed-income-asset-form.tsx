import { PrimaryButton } from "@components/molecules/primary-button";
import useCreateFixedIncomeAsset from "@hooks/fixed-income-asset/useCreateFixedIncomeAsset";
import { Asset } from "@server/services/asset/asset";
import { useAssetsContext } from "contexts/assetsContext";
import React, { useState } from "react";

const Component = () => {
  const { isCreating, createFixedIncomeAsset, error } =
    useCreateFixedIncomeAsset();
  const { setAssets } = useAssetsContext();
  const [code, setCode] = useState("");
  const [getPriceTotal, setGetPriceTotal] = useState(0);
  const [dividendRate, setDividendRate] = useState(0);
  const [usdJpy, setUsdJpy] = useState(1);
  const [paymentMonth, setPaymentMonth] = useState<number[]>([]);
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーション
    if (
      code === "" ||
      getPriceTotal === 0 ||
      dividendRate == 0 ||
      usdJpy === 0
    ) {
      alert("不正な入力値があります。");
      return;
    }
    //追加
    const createdFixedIncomeAsset = await createFixedIncomeAsset(
      code,
      getPriceTotal,
      dividendRate,
      usdJpy,
      paymentMonth
    );
    // 資産情報のstateも更新
    if (createdFixedIncomeAsset) {
      const createdAsset: Asset = {
        code: createdFixedIncomeAsset.code,
        name: createdFixedIncomeAsset.code,
        currentPrice: 0,
        currentRate: 0,
        dividends: [],
        getPrice: 0,
        getPriceTotal: createdFixedIncomeAsset.getPriceTotal,
        id: createdFixedIncomeAsset.id,
        priceGets: 0,
        quantity: 1,
        sector: "fixedIncomeAsset",
        usdJpy: createdFixedIncomeAsset.usdjpy,
        isNoTax: false,
        group: "fixedIncomeAsset",
      };
      setAssets((prev) => {
        return [...prev, createdAsset];
      });
    }
    alert(`${code}を追加しました！`);
  };

  const handlePaymentMonthChange = (month: number) => {
    setPaymentMonth((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };
  return (
    <form onSubmit={onSumbit}>
      <div className="mb-4 mt-4">
        <p className="pb-1">
          銘柄名：
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="例:COZUCHI 銀座ビル"
          />
        </p>
        <p className="pb-1">
          取得総額：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={getPriceTotal}
            onChange={(e) => setGetPriceTotal(Number(e.target.value))}
            placeholder="例:100,000"
          />
        </p>
        <p className="pb-1">
          利回り/年：¥
          <input
            className="bg-[#343a40] border-neutral-600 border rounded m-2 p-1"
            type="number"
            value={dividendRate}
            onChange={(e) => setDividendRate(Number(e.target.value))}
            placeholder="例:4.5"
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
        <div className="pb-1">
          配当月：
          <div className="flex flex-wrap">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <label key={month} className="mr-2">
                <input
                  type="checkbox"
                  value={month}
                  checked={paymentMonth.includes(month)}
                  onChange={() => handlePaymentMonthChange(month)}
                />
                {month}月
              </label>
            ))}
          </div>
        </div>
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

Component.displayName = "CreateFixedIncomeAssetForm";
export const CreateFixedIncomeAssetForm = React.memo(Component);
