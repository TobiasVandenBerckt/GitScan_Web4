/*
  Warnings:

  - You are about to drop the `_FilmToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `directorId` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Film" DROP CONSTRAINT "Film_id_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToUser" DROP CONSTRAINT "_FilmToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToUser" DROP CONSTRAINT "_FilmToUser_B_fkey";

-- AlterTable
ALTER TABLE "Film" ADD COLUMN     "directorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_FilmToUser";

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "filmid" INTEGER NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Regisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_filmid_fkey" FOREIGN KEY ("filmid") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
