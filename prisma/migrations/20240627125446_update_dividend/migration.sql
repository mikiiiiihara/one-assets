/*
  Warnings:

  - You are about to drop the column `dividend` on the `JapanStock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JapanStock" DROP COLUMN "dividend",
ADD COLUMN     "dividends" DOUBLE PRECISION NOT NULL DEFAULT 0;
