/*
  Warnings:

  - The primary key for the `_EventDetailsToSponsor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_TeamToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_EventDetailsToSponsor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_TeamToUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_EventDetailsToSponsor" DROP CONSTRAINT "_EventDetailsToSponsor_AB_pkey";

-- AlterTable
ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_EventDetailsToSponsor_AB_unique" ON "_EventDetailsToSponsor"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");
