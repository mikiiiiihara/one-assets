/*
  Warnings:

  - You are about to drop the `Cach` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cach";

-- CreateTable
CREATE TABLE "Cash" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sector" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cash_pkey" PRIMARY KEY ("id")
);
