import useAssets from "@hooks/assets/useAssets";
import { AssetsContext } from "contexts/assetsContext";
import React, { ReactNode } from "react";

export const AssetsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { assets, setAssets, isLoading, error } = useAssets();

  return (
    <AssetsContext.Provider value={{ assets, setAssets, isLoading, error }}>
      {children}
    </AssetsContext.Provider>
  );
};
