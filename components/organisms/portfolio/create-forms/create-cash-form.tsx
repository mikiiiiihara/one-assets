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
    <div className="card p-6">
      <h3 className="text-xl font-bold gradient-text mb-6">現金資産を追加</h3>
      <form onSubmit={onSumbit} className="space-y-6">
        <div>
          <label className="form-label">銘柄名</label>
          <input
            className="form-input w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 楽天銀行"
          />
        </div>
        
        <div>
          <label className="form-label">総額 (¥)</label>
          <input
            className="form-input w-full"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="例: 100,000"
          />
        </div>
        
        <div>
          <label className="form-label">通貨</label>
          <select
            className="form-select w-full"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
          </select>
        </div>
        
        <div className="flex gap-3 pt-4">
          <PrimaryButton
            content={!isCreating ? "追加" : "追加中..."}
            type="submit"
            disabled={isCreating}
            fullWidth
          />
        </div>
        
        {error && (
          <div className="bg-danger/10 border border-danger/30 rounded-lg p-3 text-danger text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

Component.displayName = "CreateCashForm";
export const CreateCashForm = React.memo(Component);
