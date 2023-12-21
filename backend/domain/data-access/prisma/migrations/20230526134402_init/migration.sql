/*
  Warnings:

  - You are about to drop the column `directorId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the `_FilmToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Film" DROP CONSTRAINT "Film_directorId_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToUser" DROP CONSTRAINT "_FilmToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToUser" DROP CONSTRAINT "_FilmToUser_B_fkey";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "directorId";

-- DropTable
DROP TABLE "_FilmToUser";

-- CreateTable
CREATE TABLE "_ActorToFilm" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToFilm_AB_unique" ON "_ActorToFilm"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToFilm_B_index" ON "_ActorToFilm"("B");

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_id_fkey" FOREIGN KEY ("id") REFERENCES "Regisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToFilm" ADD CONSTRAINT "_ActorToFilm_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToFilm" ADD CONSTRAINT "_ActorToFilm_B_fkey" FOREIGN KEY ("B") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
