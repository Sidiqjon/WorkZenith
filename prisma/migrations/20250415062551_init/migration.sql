/*
  Warnings:

  - You are about to alter the column `minWorkingHours` on the `MasterProfession` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `comment` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `masters` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `minWorkingHours` on the `Profession` table. All the data in the column will be lost.
  - You are about to drop the column `priceDaily` on the `Profession` table. All the data in the column will be lost.
  - You are about to drop the column `priceHourly` on the `Profession` table. All the data in the column will be lost.
  - You are about to drop the `OrderTool` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryComment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minWorkingHours` to the `ProfessionLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceDaily` to the `ProfessionLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceHourly` to the `ProfessionLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderTool" DROP CONSTRAINT "OrderTool_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderTool" DROP CONSTRAINT "OrderTool_toolId_fkey";

-- AlterTable
ALTER TABLE "MasterProfession" ALTER COLUMN "minWorkingHours" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "comment",
DROP COLUMN "masters",
ADD COLUMN     "deliveryComment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "toolId" TEXT,
ALTER COLUMN "professionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profession" DROP COLUMN "minWorkingHours",
DROP COLUMN "priceDaily",
DROP COLUMN "priceHourly",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ProfessionLevel" ADD COLUMN     "minWorkingHours" INTEGER NOT NULL,
ADD COLUMN     "priceDaily" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "priceHourly" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "OrderTool";

-- CreateTable
CREATE TABLE "OrderMaster" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "masterid" TEXT NOT NULL,

    CONSTRAINT "OrderMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "professionId" TEXT,
    "toolId" TEXT,
    "levelId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "timeUnit" "TimeUnit" NOT NULL,
    "workingTime" DOUBLE PRECISION NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMaster" ADD CONSTRAINT "OrderMaster_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMaster" ADD CONSTRAINT "OrderMaster_masterid_fkey" FOREIGN KEY ("masterid") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
