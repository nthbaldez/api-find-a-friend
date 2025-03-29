/*
  Warnings:

  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "county" TEXT NOT NULL;
