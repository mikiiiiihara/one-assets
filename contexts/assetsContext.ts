import { createContext, useContext } from "react";
import { Asset } from "@server/services/asset/asset";

interface AssetsContextProps {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  isLoading: boolean;
  error: string;
}

export const AssetsContext = createContext<AssetsContextProps | undefined>(
  undefined
);

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);
  if (context === undefined) {
    throw new Error("useAssetsContext must be used within an AssetsProvider");
  }
  return context;
};
