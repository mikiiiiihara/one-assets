-- AlterTable
ALTER TABLE "JapanStock" ADD COLUMN     "isNoTax" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UsStock" ADD COLUMN     "isNoTax" BOOLEAN NOT NULL DEFAULT false;
