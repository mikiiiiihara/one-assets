-- CreateTable
CREATE TABLE "AssetHistory" (
    "id" TEXT NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "fund" DOUBLE PRECISION NOT NULL,
    "crypto" DOUBLE PRECISION NOT NULL,
    "fixedIncomeAsset" DOUBLE PRECISION NOT NULL,
    "cash" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetHistory_pkey" PRIMARY KEY ("id")
);
