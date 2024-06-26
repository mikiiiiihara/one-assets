import React, { FC } from "react";
import { DisplayType, AssetPanelItem } from "./panel-item";
import { Detail } from "@components/organisms/portfolio/types";
import useCurrentUsdJpy from "@hooks/useCurrentUsdJpy";

type Props = {
  assetDetails: Detail[];
  currency: string;
  displayType?: DisplayType;
};

const AssetPanelComponent: FC<Props> = ({
  assetDetails,
  currency,
  displayType,
}) => {
  const { currentUsdJpy } = useCurrentUsdJpy();
  return (
    <div>
      {assetDetails.map((assets) => (
        <div key={assets.id}>
          <AssetPanelItem
            data={assets}
            currentUsdJpy={currentUsdJpy}
            displayType={displayType}
          />
        </div>
      ))}
    </div>
  );
};
AssetPanelComponent.displayName = "AssetPanel";
export const AssetPanel = React.memo(AssetPanelComponent);
