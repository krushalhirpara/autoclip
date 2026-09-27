-- AlterTable
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "firebaseUid" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "mobileNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_firebaseUid_key" ON "User"("firebaseUid");

-- Backfill existing user firebaseUid from Account providerAccountId if present
UPDATE "User" u
SET "firebaseUid" = a."providerAccountId"
FROM "Account" a
WHERE a."userId" = u."id" AND u."firebaseUid" IS NULL;
