/*
  Warnings:

  - You are about to drop the `_ActorToFilm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActorToFilm" DROP CONSTRAINT "_ActorToFilm_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActorToFilm" DROP CONSTRAINT "_ActorToFilm_B_fkey";

-- DropTable
DROP TABLE "_ActorToFilm";
