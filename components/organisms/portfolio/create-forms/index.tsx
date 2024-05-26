import React, { FC } from "react";
import { CreateUsStockForm } from "./create-us-stock-form";

type Props = {
  currentUsdJpy: number;
};

const Component: FC<Props> = ({ currentUsdJpy }) => {
  return <CreateUsStockForm currentUsdJpy={currentUsdJpy} />;
};

Component.displayName = "CreateForms";
export const CreateForms = React.memo(Component);
