-- CreateIndex
CREATE INDEX "AssetHistory_userId_createdAt_idx" ON "AssetHistory"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Cash_userId_idx" ON "Cash"("userId");

-- CreateIndex
CREATE INDEX "Crypto_userId_idx" ON "Crypto"("userId");

-- CreateIndex
CREATE INDEX "FixedIncomeAsset_userId_idx" ON "FixedIncomeAsset"("userId");

-- CreateIndex
CREATE INDEX "JapanFund_userId_idx" ON "JapanFund"("userId");

-- CreateIndex
CREATE INDEX "JapanStock_userId_idx" ON "JapanStock"("userId");

-- CreateIndex
CREATE INDEX "UsStock_userId_idx" ON "UsStock"("userId");
