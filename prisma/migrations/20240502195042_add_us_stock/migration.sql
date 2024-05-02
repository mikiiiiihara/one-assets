-- CreateTable
CREATE TABLE "UsStock" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "getPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "usdjpy" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsStock_pkey" PRIMARY KEY ("id")
);
