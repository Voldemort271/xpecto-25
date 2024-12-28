/*
  Warnings:

  - You are about to drop the column `type` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Competitor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompetitionToOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompetitionToSponsor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToSponsor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `competitionId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissions` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Competitor" DROP CONSTRAINT "Competitor_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Competitor" DROP CONSTRAINT "Competitor_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_groupId_fkey";

-- DropForeignKey
ALTER TABLE "_CompetitionToOrganization" DROP CONSTRAINT "_CompetitionToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompetitionToOrganization" DROP CONSTRAINT "_CompetitionToOrganization_B_fkey";

-- DropForeignKey
ALTER TABLE "_CompetitionToSponsor" DROP CONSTRAINT "_CompetitionToSponsor_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompetitionToSponsor" DROP CONSTRAINT "_CompetitionToSponsor_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToOrganization" DROP CONSTRAINT "_EventToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToOrganization" DROP CONSTRAINT "_EventToOrganization_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSponsor" DROP CONSTRAINT "_EventToSponsor_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSponsor" DROP CONSTRAINT "_EventToSponsor_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "type",
ADD COLUMN     "competitionId" TEXT NOT NULL,
ADD COLUMN     "ranking" INTEGER,
ADD COLUMN     "submissions" TEXT NOT NULL;

-- DropTable
DROP TABLE "Competitor";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "_CompetitionToOrganization";

-- DropTable
DROP TABLE "_CompetitionToSponsor";

-- DropTable
DROP TABLE "_EventToOrganization";

-- DropTable
DROP TABLE "_EventToSponsor";

-- DropTable
DROP TABLE "_EventToUser";

-- CreateTable
CREATE TABLE "Expos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exposDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workshopDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWorkshops" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserToWorkshops_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventDetailsToSponsor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventDetailsToSponsor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ExposToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExposToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expos_exposDetailsId_key" ON "Expos"("exposDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Workshops_workshopDetailsId_key" ON "Workshops"("workshopDetailsId");

-- CreateIndex
CREATE INDEX "_UserToWorkshops_B_index" ON "_UserToWorkshops"("B");

-- CreateIndex
CREATE INDEX "_EventDetailsToSponsor_B_index" ON "_EventDetailsToSponsor"("B");

-- CreateIndex
CREATE INDEX "_ExposToUser_B_index" ON "_ExposToUser"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expos" ADD CONSTRAINT "Expos_exposDetailsId_fkey" FOREIGN KEY ("exposDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workshops" ADD CONSTRAINT "Workshops_workshopDetailsId_fkey" FOREIGN KEY ("workshopDetailsId") REFERENCES "EventDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkshops" ADD CONSTRAINT "_UserToWorkshops_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkshops" ADD CONSTRAINT "_UserToWorkshops_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDetailsToSponsor" ADD CONSTRAINT "_EventDetailsToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDetailsToSponsor" ADD CONSTRAINT "_EventDetailsToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExposToUser" ADD CONSTRAINT "_ExposToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Expos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExposToUser" ADD CONSTRAINT "_ExposToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
