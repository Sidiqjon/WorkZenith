/*
  Warnings:

  - Made the column `nameUz` on table `Brand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionUz` on table `FAQ` required. This step will fail if there are existing NULL values in that column.
  - Made the column `answerUz` on table `FAQ` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Level` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Partner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Power` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Profession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Region` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Showcase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descriptionUz` on table `Showcase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aboutUz` on table `SiteMetadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `privacyPolicyUz` on table `SiteMetadata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Size` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameUz` on table `Tool` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descriptionUz` on table `Tool` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "FAQ" ALTER COLUMN "questionUz" SET NOT NULL,
ALTER COLUMN "answerUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Level" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Partner" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Power" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profession" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Region" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Showcase" ALTER COLUMN "nameUz" SET NOT NULL,
ALTER COLUMN "descriptionUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "SiteMetadata" ALTER COLUMN "aboutUz" SET NOT NULL,
ALTER COLUMN "privacyPolicyUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "nameUz" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tool" ALTER COLUMN "nameUz" SET NOT NULL,
ALTER COLUMN "descriptionUz" SET NOT NULL;
