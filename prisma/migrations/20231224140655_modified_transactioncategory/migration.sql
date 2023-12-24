/*
  Warnings:

  - Added the required column `type` to the `TransactionCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionCategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "TransactionCategory" ADD COLUMN     "type" "TransactionCategoryType" NOT NULL;
