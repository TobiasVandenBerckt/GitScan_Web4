/*
  Warnings:

  - You are about to drop the column `reviewid` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_filmid_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userid_fkey";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "reviewid";

-- DropTable
DROP TABLE "Review";
