-- DropForeignKey
ALTER TABLE "Film" DROP CONSTRAINT "Film_id_fkey";

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Regisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
