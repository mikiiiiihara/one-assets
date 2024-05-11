-- CreateTable
CREATE TABLE "JapanStock" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "getPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JapanStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JapanFund" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "getPriceTotal" DOUBLE PRECISION NOT NULL,
    "getPrice" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JapanFund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crypto" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "getPrice" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedIncomeAsset" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "getPriceTotal" DOUBLE PRECISION NOT NULL,
    "dividendRate" DOUBLE PRECISION NOT NULL,
    "usdjpy" DOUBLE PRECISION NOT NULL,
    "paymentMonth" INTEGER[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixedIncomeAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JapanFundPrice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JapanFundPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JapanStockPrice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dividend" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JapanStockPrice_pkey" PRIMARY KEY ("id")
);
