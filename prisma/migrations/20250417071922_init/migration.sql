/*
  Warnings:

  - You are about to drop the column `stars` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MasterProfession" DROP CONSTRAINT "MasterProfession_professionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "stars";

-- CreateTable
CREATE TABLE "MasterRatings" (
    "id" TEXT NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,
    "masterId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "MasterRatings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MasterProfession" ADD CONSTRAINT "MasterProfession_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRatings" ADD CONSTRAINT "MasterRatings_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRatings" ADD CONSTRAINT "MasterRatings_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
