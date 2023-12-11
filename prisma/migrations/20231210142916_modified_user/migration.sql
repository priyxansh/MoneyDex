-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'USD', 'CAD', 'AUD', 'EUR', 'GBP', 'RUB', 'JPY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'INR',
ADD COLUMN     "image" TEXT;
