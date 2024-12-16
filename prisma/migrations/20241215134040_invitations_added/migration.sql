/*
  Warnings:

  - The primary key for the `_CompetitionToOrganization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CompetitionToSponsor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_EventToOrganization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_EventToSponsor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_EventToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProniteToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_TeamToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CompetitionToOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CompetitionToSponsor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_EventToOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_EventToSponsor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_EventToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ProniteToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_TeamToUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_CompetitionToOrganization" DROP CONSTRAINT "_CompetitionToOrganization_AB_pkey";

-- AlterTable
ALTER TABLE "_CompetitionToSponsor" DROP CONSTRAINT "_CompetitionToSponsor_AB_pkey";

-- AlterTable
ALTER TABLE "_EventToOrganization" DROP CONSTRAINT "_EventToOrganization_AB_pkey";

-- AlterTable
ALTER TABLE "_EventToSponsor" DROP CONSTRAINT "_EventToSponsor_AB_pkey";

-- AlterTable
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_ProniteToUser" DROP CONSTRAINT "_ProniteToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CompetitionToOrganization_AB_unique" ON "_CompetitionToOrganization"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompetitionToSponsor_AB_unique" ON "_CompetitionToSponsor"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToOrganization_AB_unique" ON "_EventToOrganization"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSponsor_AB_unique" ON "_EventToSponsor"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProniteToUser_AB_unique" ON "_ProniteToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");
