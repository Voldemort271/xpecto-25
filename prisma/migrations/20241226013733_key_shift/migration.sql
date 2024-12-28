/*
  Warnings:

  - The primary key for the `RegistrationLevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name,competitionId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `RegistrationLevel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Team_name_key";

-- AlterTable
ALTER TABLE "RegistrationLevel" DROP CONSTRAINT "RegistrationLevel_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RegistrationLevel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_competitionId_key" ON "Team"("name", "competitionId");
